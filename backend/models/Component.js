const Sequelize = require('sequelize');
const sequelize = require('../db');

const Component = sequelize.define('component', {
  name: Sequelize.STRING,
  default: {
    type: Sequelize.ENUM('default', 'not default'),
    defaultValue: 'not default',
  },
});

module.exports = Component;