const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("productSoap", {
    title_soap: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    description_soap: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    sku_soap: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    stock_inicial_soap: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    precio_inicial_soap: {
      type: DataTypes.REAL,
      defaultValue: 0
    },
    // images_soap: {
    //   type: DataTypes.ARRAY(DataTypes.TEXT)
    // }
  });
};