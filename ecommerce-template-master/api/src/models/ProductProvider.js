const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("productprovider", {
    stock: {
      type: DataTypes.INTEGER,
    },
    precio: {
      type: DataTypes.REAL,
    },
    link: {
      type: DataTypes.STRING,
      defaultValue: null
    },
  });
};
