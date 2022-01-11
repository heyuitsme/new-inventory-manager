const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('new-inventory-manager', 'user', 'pass', {
    dialect: 'sqlite',
    host: './db.sqlite',
});

module.exports = sequelize;