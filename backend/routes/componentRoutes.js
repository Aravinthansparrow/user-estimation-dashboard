// componentRoutes.js

const express = require('express');
const router = express.Router();
const componentController = require('../controllers/componentController');

// Fetch all components
router.get('/', componentController.getAllComponents);

// Create a new component
router.post('/', componentController.createComponent);

// Update a component
router.put('/:id', componentController.updateComponent);

// Delete a component
router.delete('/:id', componentController.deleteComponent);

module.exports = router;
