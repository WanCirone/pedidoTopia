const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

    sequelize.define('orders', {
            // La orden por ahora sólo va a tener un estado "creada"
            //La tabla de ordenes va a tener asociados un userId, productId, precio y cantidad
        status:{  
            type: DataTypes.ENUM('created'),
            allowNull: false
        }
    });
};