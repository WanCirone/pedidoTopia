const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("product", {
    title: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    stock_inicial: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    stock_total_actual: {
      type: DataTypes.INTEGER,
     // allowNull: false
    },
    precio_inicial: {
      type: DataTypes.REAL,
      defaultValue: 0
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    productId_Shopify: {
      type: DataTypes.BIGINT,
      defaultValue: null
    },
    productId_Meli: {
      type: DataTypes.STRING,
      defaultValue: null
    },
  });
};
