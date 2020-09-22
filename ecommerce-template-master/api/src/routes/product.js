const server = require("express").Router();
const request = require("request-promise");
//Modelos
const { Product } = require("../db.js");
//Shopify y MeLi
const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_PASSWORD,
  APP_DOMAIN,
  TOKEN_MELI,
  USER_ID_MELI,
} = process.env;

server.get("/", async (req, res, next) => {
  //Ruta para traer todos los productos de Shopify
  const testUrlShopify = `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${APP_DOMAIN}/admin/api/2020-07/`;

  let optionsShopify = {
    method: "GET",
    uri: testUrlShopify + "products.json",
    json: true,
  };
  const productsShopify = await request(optionsShopify);

  //Ruta pra traer los items de un user de MeLi
  const testUrlMeLI = `https://api.mercadolibre.com/users/${USER_ID_MELI}/items/search?access_token=${TOKEN_MELI}`;

  let optionsMeli = {
    method: "GET",
    uri: testUrlMeLI,
    json: true,
  };

  const productsMeLi = await request(optionsMeli);
  const resultado = productsMeLi.results;

  var productMeLi = [];
  for (let i = 0; i < resultado.length; i++) {
    const testUrlMeliProduct = `https://api.mercadolibre.com/items?ids=${resultado[i]}&access_token=${TOKEN_MELI}`;

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

module.exports = server;
