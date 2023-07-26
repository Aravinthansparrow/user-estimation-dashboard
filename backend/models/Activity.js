const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Activity = sequelize.define("Activity", {
    activity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    percentagesplit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  module.exports = Activity