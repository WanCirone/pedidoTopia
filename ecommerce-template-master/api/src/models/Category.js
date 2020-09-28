const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("category", {
    title_sugerido: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    id_Meli: {
      type: DataTypes.STRING,
      defaultValue : null
    },
  });
};
