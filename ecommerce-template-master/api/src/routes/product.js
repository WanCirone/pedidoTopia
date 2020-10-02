const server = require('express').Router()
const request = require('request-promise')
const meli = require('mercadolibre')

//Modelos
const {
  Product,
  Category,
  Orders,
  Productprovider,
  Provider,
} = require('../db.js')

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
} = process.env

// console.log("acces_token: " + access_token);

//var refresh_token = "";
const testUrl = `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${APP_DOMAIN}/admin/api/2020-07/`

const mercadolibre = new meli.Meli(
  client_id,
  client_secret,
  access_token,
  refresh_token
)

const getUrlCode = mercadolibre.getAuthURL(redirect_uri)
// console.log(getUrlCode);

const meliAuthorize = mercadolibre.authorize(code, redirect_uri, (err, res) => {
  if (res.access_token) {
    // console.log(res);
    access_token = res.access_token
    refresh_token = res.refresh_token
  }
})

const meliRefreshToken = mercadolibre.refreshAccessToken((err, res) => {
  access_token = res.access_token
  refresh_token = res.refresh_token
  console.log(access_token)
})

server.get('/', async (req, res, next) => {
  //Ruta para traer todos los productos de Shopify
  const testUrlShopify = `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${APP_DOMAIN}/admin/api/2020-07/`

  let optionsShopify = {
    method: 'GET',
    uri: testUrlShopify + 'products.json',
    json: true,
  }

  const productsShopify = await request(optionsShopify)

  //Ruta para traer los items de un user de MeLi
  const rutaMeli = 'https://api.mercadolibre.com'
  const testUrlMeLI = `${rutaMeli}/users/${USER_ID_MELI}/items/search?access_token=${access_token}`

  const optionsMeli = { method: 'GET', uri: testUrlMeLI, json: true }
  const productsMeLi = await request(optionsMeli)
  const resultado = productsMeLi.results

  var productMeLi = []
  for (let i = 0; i < resultado.length; i++) {
    const testUrlMeliProduct = `${rutaMeli}/items?ids=${resultado[i]}&access_token=${access_token}`

    let optionsMeliProduct = {
      method: 'GET',
      uri: testUrlMeliProduct,
      json: true,
    }

    let producto = await request(optionsMeliProduct)
    productMeLi.push(producto)
  }

  res.json({ productMeLi, productsShopify })
})

//Cargar un producto en mi BD
server.post('/', (req, res) => {
  const promiseProducto = Product.findOrCreate({
    where: {
      title: req.body.title,
      description: req.body.description,
      sku: req.body.sku,
      stock_inicial: req.body.stock_inicial,
      precio_inicial: req.body.precio_inicial,
      images: req.body.images,
    },
  })

  const promiseCategoria = Category.findOrCreate({
    where: {
      title_sugerido: req.body.category_sugerida,
    },
  })

  Promise.all([promiseProducto, promiseCategoria])
    .then((values) => {
      product = values[0][0]
      category = values[1][0]

      console.log('prods: ' + JSON.stringify(product))
      console.log('cats: ' + JSON.stringify(category))

      product
        .update({
          categoryId: category.id,
        })
        .then((product) => {
          return Product.findOne({
            where: { id: product.id },
            include: [Category],
          })
        })
        .then((producto) => res.send(producto))
    })
    .catch((err) => {
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

server.post('/publicar/:id', async (req, res) => {
  try {
    const idProd = req.params.id
    const { source, precio, stock, category_id } = req.body
    let prod = null
    let link = null
    let providerId = null
    console.log('req bodye s: ' + JSON.stringify(req.body))

    // Busco el producto que quiere publicar el usuario
    const productToPublish = await Product.findOne({
      where: { id: idProd },
    })

    if (source === 'shopify') {
      // Le envio el Producto a la funcion
      prod = await publicarShopify(productToPublish, precio, stock)

      await productToPublish.update({
        productId_Shopify: prod.product.id,
      })
    //  link = prod.title.toLowerCase().replace(/\s+/g, "-");
      providerId = 2
    } else if (source === 'mercadolibre') {
      prod = await publicarMeli(productToPublish, precio, stock, category_id)

      await productToPublish.update({
        productId_Meli: prod.id,
      })
      providerId = 1
      link = prod.permalink
    }

    await Productprovider.create({
      stock,
      precio,
      link,
      productId: productToPublish.id,
      providerId,
    })

    Product.findOne({
      where: { id: idProd },
      include: [Provider],
    }).then((producto) => res.send(producto))
  } catch (error) {
    res.status(500).send(error)
  }
})

async function publicarShopify(producto, precio, stock) {
  const imagesUrl = producto.images.map((url) => {
    return { src: url }
  })
  const productoShopify = {
    product: {
      title: producto.title,
      body_html: producto.description,
      vendor: producto.proveedor,
      published_scope: 'web',
      variants: [
        {
          inventory_management: 'shopify',
          inventory_quantity: stock,
          price: precio,
        },
      ],
      images: imagesUrl,
    },
  }

  let options = {
    method: 'POST',
    uri: testUrl + 'products.json',
    body: productoShopify,
    json: true,
  }

  const post = await request(options)
  console.log('post es: ' + JSON.stringify(post))
  return post
}

async function publicarMeli(producto, precio, stock, category_id) {
  console.log(JSON.stringify(producto))
  const images = producto.images.map((i) => {
    return { source: i }
  })
  let data = {
    title: producto.title,
    category_id: category_id,
    price: precio,
    currency_id: 'ARS',
    available_quantity: stock,
    buying_mode: 'buy_it_now',
    condition: 'new',
    listing_type_id: 'gold_special',
    description: {
      plain_text: producto.description,
    },

    sale_terms: [
      {
        id: 'WARRANTY_TYPE',
        value_name: 'Garantía del vendedor',
      },
      {
        id: 'WARRANTY_TIME',
        value_name: '90 días',
      },
    ],
    pictures: images,

    attributes: [
      {
        id: 'BRAND',
        value_name: 'Marca del producto',
      },
      {
        id: 'EAN',
        value_name: '7898095297749',
      },
    ],
  }

  let options = {
    method: 'POST',
    uri: `https://api.mercadolibre.com/items?access_token=${access_token}`,
    body: data,
    json: true,
  }

  const post = await request(options)
  console.log('post en meli es: ' + JSON.stringify(post))
  return post
}

server.get('/db', (req, res) => {
  Product.findAll({
    include: [Category, Provider],
  }).then((products) => {
    res.send(products)
  })
})

module.exports = server
