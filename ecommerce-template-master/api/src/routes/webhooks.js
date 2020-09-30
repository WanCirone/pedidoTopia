const server = require("express").Router();
const fetch = require('node-fetch');
const meli = require("mercadolibre");

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
  });


function getOrder(orderId) {
    fetch(`https://api.mercadolibre.com/orders/${orderId}?access_token=${access_token}`, {
        method: 'GET', 
    })
    .then(response => response.json())
    .then(order => {
        console.log(JSON.stringify(order) + 'RESPUESTA MELI!!! ')
        Orders.create({
            shopify_Id: order.id,
            cantidad: order_items[0].quantity,
            total: order.total_amount,
            status: 'created',
            user_Id: order.buyer.id,
        })
    })
    .then(created => res.status(200).send('Se ha creado la orden en la bd'))
    .catch(error => console.error('Error: ' + error))
}

server.post('/shopify', (req, res) => {
    const rta = req.body;
    console.log(JSON.stringify(rta)) 

        Orders.create({
            shopify_Id: req.body.id,
            cantidad: req.body.line_items[0].quantity,
            total: req.body.total_price,
            subtotal: req.body.subtotal_price,
            status: 'created',
            user_Id: req.body.user_id,
        })
  
    .then(created => res.status(200).send('Se ha creado la orden en la bd'))
    .catch(error => console.error('Error: ' + error))
})

server.post('/meli', (req, res) => {
    const rta = req.body;
    console.log('Llegó la respuesta de MELI: ' + JSON.stringify(rta))
    var id = req.body.resource.split('/'); 
    var orderId = id[id.length-1];
    console.log(orderId + ' ACAAAAA');
    getOrder(orderId);
})

server.post('/shopify/create', (req, res) => {
  const rtaPubli = req.body;
  console.log("Rta de Shopify" + JSON.stringify(rtaPubli))

    Product.create({
      id: req.body.id,
      shopify_Id: req.body.inventory_management,
      title: req.body.title,
      // description: req.body.description,
    })
    .then(resp => {
      res.send(rtaPubli)
    })

})

module.exports = server;