const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("provider", {
    Id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Api_URL: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    App_Id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};