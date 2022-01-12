const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database')

class Test extends Model {}

Test.init({
    product_name: {
        type: DataTypes.STRING, 
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'test',
    tableName: 'test'
});



module.exports = Test;