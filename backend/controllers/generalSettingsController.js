// generalSettingsController.js

const GeneralSettings = require('../models/GeneralSettings');

// Get general settings
const getGeneralSettings = async (req, res) => {
  try {
    const generalSettings = await GeneralSettings.findOne();
    res.json(generalSettings);
  } catch (error) {
    console.error('Error retrieving general settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update general settings
const updateGeneralSettings = async (req, res) => {
  try {
    const { version, document_version, hours_per_story_point, rate_per_hour } = req.body;
    await GeneralSettings.update(
      { version, document_version, hours_per_story_point, rate_per_hour },
      { where: {} }
    );
    res.sendStatus(204);
  } catch (error) {
    console.error('Error updating general settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getGeneralSettings,
  updateGeneralSettings,
};
