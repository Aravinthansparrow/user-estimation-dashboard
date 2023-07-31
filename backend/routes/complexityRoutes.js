// complexityRoutes.js

const express = require('express');
const router = express.Router();
const complexityController = require('../controllers/complexityController');

// Update complexity
router.put('/', complexityController.updateComplexity);

// Get all complexities
router.get('/', complexityController.getAllComplexities);

// Create a new complexity
router.post('/', complexityController.createComplexity);

module.exports = router;
