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
    // console.log(res);
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
server.post('/', (req, res) => {
  
  const promiseProducto = Product.findOrCreate({
    where: {
      title: req.body.title,
      description: req.body.description,
      sku: req.body.sku,
      stock_inicial: req.body.stock_inicial,
      precio_inicial: req.body.precio_inicial,
    },
  });
  
  const promiseCategoria = Category.findOrCreate({
    where: {
      title_sugerido: req.body.category_sugerida,
    },
  });

  Promise.all([promiseProducto, promiseCategoria])
    .then((values) => {
      product = values[0][0];
      category = values[1][0];
    
      product.update({
        categoryId : category.id
      })
      .then(product => {
        console.log('product aqui seria: '+ JSON.stringify(product))
        return Product.findOne({
          where: { id: product.id },
          include: [Category]
        })
      })
      .then((producto) => res.send(producto))
    })
    .catch(err => {
      console.log('No se ha podido crear el producto' + err)
      res.sendStatus(400)
    })
  })
//Crear o encontrar producto en DB
// server.post("/", async (req, res) => {
  
//   //Crea y devuelve el producto
//   const p = await crearProducto(req)

//   res.send(p);
// });

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
      category_id: "MLA3530",
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
          source: "https://d26lpennugtm8s.cloudfront.net/stores/678/525/products/71-9c9d1cf749d0242a5815701896774858-640-0.jpg"
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
    }; 

    console.log(JSON.stringify(data))

    fetch(`https://api.mercadolibre.com/items?access_token=${access_token}`, {
      method: 'POST', 
      body: JSON.stringify(data)})
      .then(res => res.json())
      .then((response)=> {
        if(response.error) throw new Error('No se publico')
        else {
        console.log('Se creo el producto: '+ JSON.stringify(response) + ' en MELI')
        console.log('Se creo el producto: '+ JSON.stringify(response.id) + ' en MELI')
        console.log('Se creo el link: '+ JSON.stringify(response.permalink) + ' en MELI')
        console.log('req.params.id: '+ req.params.id)

        Productprovider.findOne({
          where: {
            productId: req.params.id
          }
        }).then(productToUpadte => {
          productToUpadte.update({
            productId_Meli: response.id,
            link_meli: response.permalink
          })

          Product.findOne({
            where: { id: req.params.id },
            include: [Provider]
          })
          .then((producto) => res.send(producto))
        })
      }
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

server.get('/db', (req, res) => {
  Product.findAll({
    include: [Category, Provider],
}).then((products) => {
  res.send(products)
})
})

module.exports = server;