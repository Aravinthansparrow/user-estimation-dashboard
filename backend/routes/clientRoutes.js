// clientRoutes.js

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Create a new client
router.post('/', clientController.createClient);

// Get all clients or a single client by ID with associated work items
router.get('/', clientController.getClients);

// Update client status
router.put('/:id', clientController.updateClientStatus);

module.exports = router;
