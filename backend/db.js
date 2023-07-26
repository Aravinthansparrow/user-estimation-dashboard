const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('estimate', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3307
});

module.exports = sequelize;