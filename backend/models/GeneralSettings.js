// Assuming you have set up Sequelize and defined the database connection
const sequelize = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

// Define the GeneralSettings model
const GeneralSettings = sequelize.define('general_settings', {
  version: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  document_version: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  hours_per_story_point: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rate_per_hour: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

//Create the table in the database
// GeneralSettings.sync({ force: true })
//   .then(() => {
//     // Insert initial values
//     return GeneralSettings.create({
//       version: 1,
//       document_version: 1,
//       hours_per_story_point: 8,
//       rate_per_hour: 5
//     });
//   })
//   .then(() => {
//     console.log('GeneralSettings table created and initial values inserted.');
//   })
//   .catch((error) => {
//     console.error('Error creating GeneralSettings table:', error);
//   });


  module.exports = GeneralSettings;