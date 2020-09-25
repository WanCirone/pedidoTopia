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
    proveedor: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    stock_inicial: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    precio_inicial: {
      type: DataTypes.REAL,
      defaultValue: 0
    },
  });
};
