const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

    sequelize.define('orders', {
            // La orden por ahora sólo va a tener un estado "creada"
            //La tabla de ordenes va a tener asociados un userId, productId
        meli_Id: {
            type: DataTypes.BIGINT,
            defaultValue : null
        },
        shopify_Id: {
            type: DataTypes.BIGINT,
            defaultValue: null
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        subtotal: {
            type: DataTypes.DECIMAL,
            defaultValue: null
        },
        status:{  
            type: DataTypes.ENUM('created'),
            allowNull: false
        },
        user_Id: {
            type: DataTypes.INTEGER,
            defaultValue: null
        }
    });
};