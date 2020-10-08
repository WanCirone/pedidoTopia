const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("provider", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    api_Url: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    app_Id: {
      type: DataTypes.STRING,
      // allowNull: false
    },
  });
};
