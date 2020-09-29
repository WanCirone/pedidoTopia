const server = require("express").Router();
const { Product, Category } = require("../db.js");
const fetch = require("node-fetch")

server.get('/predictor/:id', async (req, res) => {
    const productId = +req.params.id;

    const product = await Product.findOne({
        where : {
            id : productId
        },
        include : [Category]
    })

    if(product){
        const categoryToPredict = product.category.title_sugerido;
    
        fetch(`https://api.mercadolibre.com/sites/MLA/domain_discovery/search?q=${categoryToPredict}}`)
        .then(response => response.json())
        .then(categories => {
            console.log('categories es: '+ JSON.stringify(categories))
            res.send(categories)
        })
    } else {
        res.status(404).send({
            error: "No se encontró producto con ese id"
        })
    }
})

module.exports = server; 