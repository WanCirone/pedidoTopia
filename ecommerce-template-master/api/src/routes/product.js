const server = require("express").Router();
const request = require("request-promise");
const meli = require("mercadolibre");

//Modelos
const { Product, Provider, Productprovider } = require("../db.js");
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

//Borrar un producto
server.delete("/:id", (req, res) => {
  const { id } = req.params;
  var idML = "";

  Product.findOne({ where: { id: req.params.id } })
    .then((product) => {
      if (!product) return "Id no válido";
      // console.log('product encontrado: '+ JSON.stringify(product))
      idML = product.idML;
      product.destroy().then(() => {
        // console.log('producto borrado db: '+ JSON.stringify(product))
      });
      fetch(
        `https://api.mercadolibre.com/items/${idML}?access_token=${token}`,
        {
          method: "PUT",
          header: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ status: "closed" }),
        }
      ).then((res) => res.json());
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send(error);
    });

  fetch(
    `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${APP_DOMAIN}/admin/api/2020-07/` +
      `/products/${req.params.id}.json`,
    {
      method: "DELETE",
    }
  )
    .then((res) => res.json())
    .then((res) => res.send("OK"))
    .catch((error) => {
      res.status(500).send(error);
    });
});

server.post("/", (req, res) => {
  try {
    const mercadolibre = new meli.Meli(client_id, client_secret, access_token);
    // var user
    // mercadolibre.get('/users/me', function (err, res) {
    //     console.log(err, res.site_id)
    //   user = res.site_id
    //   console.log("estes es el user", user)
    // });
    // var predict
    // mercadolibre.get(`/sites/${site_id}/category_predictor/predict?title=${encodeURIComponent(req.body.title)}`, function (err, res) {
    //   console.log(err, res)
    //   predict = res
    // });
    // console.log("este es el predict", predict)
    // console.log(req.body)
    const body = {
      title: req.body.title,
      category_id: req.body.category_id,
      price: req.body.price,
      currency_id: req.body.currency_id,
      available_quantity: req.body.available_quantity,
      buying_mode: "buy_it_now",
      listing_type_id: req.body.listing_type_id,
      condition: req.body.condition,
      description: req.body.description,
      tags: ["immediate_payment"],
      pictures: [
        {
          source: `${req.protocol}://${req.get("host")}/pictures/${req.file}`,
        },
      ],
    };
    mercadolibre.post("/items", body, null, (err, response) => {
      if (err) {
        throw err;
      } else {
        // console.log('publicado na categoria:', predict.name);
        // console.log('category probability (0-1):', predict.prediction_probability, predict.variations);
        res.send(response);
      }
    });
  } catch (err) {
    console.log("Error", err);
    res.status(500).send(`Error! ${err}`);
  }
});

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
  console.log('entra a pblc shopify: '+ datos)

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
