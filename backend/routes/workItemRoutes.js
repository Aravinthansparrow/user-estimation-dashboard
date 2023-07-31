// workItemRoutes.js

const express = require('express');
const router = express.Router();
const workItemController = require('../controllers/workItemController');

// Create a new work item
router.post('/', workItemController.createWorkItem);

// Get all work items for a specific client
router.get('/', workItemController.getWorkItemsByClientId);

module.exports = router;
