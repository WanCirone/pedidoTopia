const { crearProducto } = require('./utils');
const server = require("express").Router();
const request = require("request-promise");
const meli = require("mercadolibre");
const fetch = require('node-fetch')

//Modelos
const { Product, Category, Orders, Productprovider, Provider } = require("../db.js");

//Shopify y MeLi
let {
  SHOPIFY_API_KEY,
  SHOPIFY_API_PASSWORD,
  APP_DOMAIN,
  USER_ID_MELI,
  client_id,
  client_secret,
  redirect_uri,
  code,
  access_token,
  refresh_token,
} = process.env;

//var refresh_token = "";
const testUrl = `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${APP_DOMAIN}/admin/api/2020-07/`;

const mercadolibre = new meli.Meli(
  client_id,
  client_secret,
  access_token,
  refresh_token
);

const getUrlCode = mercadolibre.getAuthURL(redirect_uri);
// console.log(getUrlCode);

const meliAuthorize = mercadolibre.authorize(code, redirect_uri, (err, res) => {
  if (res.access_token) {
    console.log(res);
    access_token = res.access_token;
    refresh_token = res.refresh_token;
  }
});

const meliRefreshToken = mercadolibre.refreshAccessToken((err, res) => {
  access_token = res.access_token;
  refresh_token = res.refresh_token;
  // console.log(res);
});

server.get("/", async (req, res, next) => {
  //Ruta para traer todos los productos de Shopify
  const testUrlShopify = `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${APP_DOMAIN}/admin/api/2020-07/`;

  let optionsShopify = {
    method: "GET",
    uri: testUrlShopify + "products.json",
    json: true,
  };
  const productsShopify = await request(optionsShopify);

  //Ruta para traer los items de un user de MeLi
  const rutaMeli = "https://api.mercadolibre.com";
  const testUrlMeLI = `${rutaMeli}/users/${USER_ID_MELI}/items/search?access_token=${access_token}`;

  const optionsMeli = { method: "GET", uri: testUrlMeLI, json: true };
  const productsMeLi = await request(optionsMeli);
  const resultado = productsMeLi.results;

  var productMeLi = [];
  for (let i = 0; i < resultado.length; i++) {
    const testUrlMeliProduct = `${rutaMeli}/items?ids=${resultado[i]}&access_token=${access_token}`;

    let optionsMeliProduct = {
      method: "GET",
      uri: testUrlMeliProduct,
      json: true,
    };

    let producto = await request(optionsMeliProduct);
    productMeLi.push(producto);
  }

  res.json({ productMeLi, productsShopify });
});

//Cargar un producto en mi BD
server.post('/bd', (req, res) => {
  const promiseProducto = Product.findOrCreate({
    where: {
      title: req.body.title,
      description: req.body.description,
      proveedor: req.body.proveedor,
    },
  });
  const promiseCategoria = Category.findOrCreate({
    where: {
      title: req.body.category_title,
      description: req.body.category_description,
      id_Meli: req.body.category_id_Meli,
    },
  });
  const promiseProvider = Provider.findOrCreate({
    where: {
      meli_Id: req.body.meli_Id,
      name: req.body.name_provider,
    },
  });

  Promise.all([promiseProducto, promiseCategoria, promiseProvider])
    .then((values) => {
      product = values[0][0];
      category = values[1][0];
      provider = values[2][0];
      productId = values[0][0].dataValues.id;
      product.addCategories(productId);
      provider.addProducts(productId, {
        through: {
          fecha_creacion: req.body.fecha_creacion,
          stock: req.body.stock,
          precio: req.body.precio,
        },
      });
    })
    .catch((e) => {
      console.log(e);
    })
  .then(prod => { res.status(202).send('Se ha creado producto en la bd') })
  .catch(err => {
    console.log('No se ha podido crear el producto' + err)
    res.sendStatus(400)
  })
})

//Crear o encontrar producto en DB
server.post("/", async (req, res) => {
  
  //Crea y devuelve el producto
  const p = await crearProducto(req)

  res.send(p);
});

//Publicar un producto en MELI
server.post("/meli/:id", (req, res) => {
console.log(req.params.id)
  Product.findOne({ where: {
    id: req.params.id },
    include: 
      [ Category, Provider ]
  })
  .then(prod => {
    console.log(prod)

    var data =  {
      title: prod.dataValues.title,
      category_id: prod.dataValues.categories[0].id_Meli,
      price: prod.providers[0].dataValues.productprovider.precio,
      currency_id:"ARS",
      available_quantity: prod.providers[0].dataValues.productprovider.stock,
      condition:"new",
      listing_type_id:"gold_special",
      description:{
         plain_text: prod.dataValues.description
      },
      sale_terms:[
         {
          id:"WARRANTY_TYPE",
          value_name:""
         },
         {
          id:"WARRANTY_TIME",
          value_name:"90 días"
         }
      ],
      pictures:[
        {
          source: null
        }
      ],
      attributes:[
        {
          id:"COLOR",
          value_name:"Azul"
         },
         {
          id:"SIZE",
          value_name: "M"
         }
      ]
    }; console.log(data);
    fetch(`https://api.mercadolibre.com/items?access_token=${access_token}`, {
      method: 'POST', 
      body: JSON.stringify(data)})
      .then(res => res.json())
      .then((response)=> {
        console.log('Se creo el producto: '+ JSON.stringify(response) + ' en MELI')
      })
      .catch(err => res.status(502).json({ 
        error: "No se pudo crear el producto en MELI"
      }))
  })
})
server.post('/publicar/:id', async (req, res) => {
  const idProd = req.params.id;
  const { source, precio, stock } = req.body;

  // Busco el producto que quiere publicar el usuario 
  const productToUpdate = await Product.findOne({
    where: { id: idProd }
  })

  // Le envio el Producto a la funcion
  const prod = await publicarShopify(productToUpdate , precio, stock)
  
  const idShopifyNuevo = prod.product.id

  const productModificado = await Productprovider.findOne({
    where: {
      productId: idProd
    }
  })

  await productModificado.update({
    productId_Shopify: idShopifyNuevo
  })
  
  Product.findOne({
    where: { id: idProd },
    include: [Provider]
  })
  .then((producto) => res.send(producto))
    
});

async function publicarShopify(producto, precio, stock){

  const productoShopify = {
    product: {
        title: producto.title,
        body_html: "<strong>Good snowboard!</strong>",
        vendor: producto.proveedor,
        published_scope: "web",
        variants: [
          {
            inventory_management: "shopify",
            inventory_quantity: stock,
            price: precio,
          },
        ],
        images: [],
      },
};

  let options = {
    method: "POST",
    uri: testUrl + "products.json",
    body: productoShopify,
    json: true,
  }; 

  const post = await request(options);
  console.log('post es: '+ JSON.stringify(post))
  return post
}

module.exports = server;
