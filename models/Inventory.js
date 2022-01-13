const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database')

class Inventory extends Model {}

Inventory.init({
    product_name: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    sku: {
        type: DataTypes.STRING, 
        allowNull: false
        // unique: true
    },
    quantity: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE(2), 
        allowNull: false
    },
    cost: {
        type: DataTypes.DOUBLE(2), 
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    ext_description: {
        type: DataTypes.TEXT
    },
    product_img: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ext_product_url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    int_notes: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    modelName: 'inventory',
    tableName: 'inventory'
});

module.exports = Inventory;

