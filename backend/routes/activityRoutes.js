// activityRoutes.js

const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// Get all activities
router.get("/", activityController.getAllActivities);

// Create a new activity
router.post("/", activityController.createActivity);

// Update an activity
router.put("/:id", activityController.updateActivity);

// Delete an activity
router.delete("/:id", activityController.deleteActivity);

module.exports = router;
