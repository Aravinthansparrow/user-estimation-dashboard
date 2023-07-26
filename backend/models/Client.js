const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const WorkItem = require('./WorkItem');

const Client = sequelize.define('Client', {
  clientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clientAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('approved', 'not approved', 'rejected'),
    defaultValue: 'not approved',
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    // get() {
    //   // Convert the date to "dd-mm-yyyy" format
    //   const date = this.getDataValue('createdAt');
    //   const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    //   return formattedDate;
    // },
  },
});

Client.hasMany(WorkItem, {
  foreignKey: {
    name: 'clientId',
    allowNull: false,
  },
});

module.exports = Client;
