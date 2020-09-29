const server = require("express").Router();
const request = require("request-promise");
const meli = require("mercadolibre");

//Modelos
const {
  Product,
  Category,
  Orders,
  Productprovider,
  Provider,
} = require("../db.js");

  //Crea o encuentra el producto y lo devuelve
async function crearProducto(req) {
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

  let p

  await Promise.all([promiseProducto, promiseCategoria, promiseProvider])
    .then((values) => {
      const product = values[0][0];
      const category = values[1][0];
      const provider = values[2][0];
      const productId = values[0][0].dataValues.id;
      product.addCategories(productId);
      provider.addProducts(productId, {
        through: {
          fecha_creacion: req.body.fecha_creacion,
          stock: req.body.stock,
          precio: req.body.precio,
        },
      });
      p = product
    })
    .catch((e) => {
      console.log(e);
    })

  return p
}

// info = {
//   body: {
//     title: "Lucho",
//     description: "Sin cerebro",
//     proveedor: "tio alber",
//     category_title: "lavado de cerebro",
//     category_description: "pan y circo",
//     category_id_Meli: "MLA1530456",
//     meli_Id: "125",
//     name_provider: "mercadolibre",
//     fecha_creacion: "24/09/2020",
//     stock: 1,
//     precio: 2.5,
//   },
// };

// crearProducto(info);

module.exports = { crearProducto, utils: server };
