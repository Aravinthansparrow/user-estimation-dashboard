// generalSettingsRoutes.js

const express = require('express');
const router = express.Router();
const generalSettingsController = require('../controllers/generalSettingsController');

// Get general settings
router.get('/', generalSettingsController.getGeneralSettings);

// Update general settings
router.put('/', generalSettingsController.updateGeneralSettings);

module.exports = router;
