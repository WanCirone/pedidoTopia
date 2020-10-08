const server = require('express').Router()
const { Product, Category } = require('../db.js')
const request = require('request-promise')

server.get('/predictor/:id', async (req, res) => {
  const productId = +req.params.id

  const product = await Product.findOne({
    where: {
      id: productId,
    },
    include: [Category],
  })

  if (product) {
    let categoryToPredict = product.title

    let options = {
      uri: `https://api.mercadolibre.com/sites/MLA/domain_discovery/search?q=${categoryToPredict}`,
      json: true,
    }

    const predicts = await request(options)

    if (predicts.length === 0) {
      res.status(404).send({
        error: 'No encontramos categorias para esa busqueda',
      })
    } else {
      console.log('categories es: ' + JSON.stringify(predicts))

      res.send(predicts)
    }
  } else {
    res.status(404).send({
      error: 'No se encontró producto con ese id',
    })
  }
})

module.exports = server
