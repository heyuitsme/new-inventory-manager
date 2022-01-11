const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database')

class Category extends Model {}

Category.init({
    category_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
        sequelize,
        modelName: 'category',
        tableName: 'category'
});

module.exports = Category;
