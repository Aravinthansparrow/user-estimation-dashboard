const { DataTypes } = require('sequelize');
const sequelize = require('../db');


const WorkItem = sequelize.define('WorkItem', {
  module: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  appType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  componentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  componentType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  complexity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  buildEffort: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  effortOverride: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  finalEffort: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});



module.exports = WorkItem;

