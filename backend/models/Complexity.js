const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Complexity = sequelize.define('complexity', {
  complexity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  days: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Complexity;
