const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const WorkItem = require('../models/WorkItem');

router.post('/', async (req, res) => {
  try {
    const { clientName, clientAddress, email, createdBy } = req.body;

    const client = await Client.create({
      clientName,
      clientAddress,
      email,
      createdBy,
    });

    res.status(201).json(client);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ error: 'Error creating client' });
  }
});

router.get('/', async (req, res) => {
  const { id } = req.query;

  try {
    let clients;

    if (id) {
      clients = await Client.findByPk(id, {
        include: WorkItem,
      });
    } else {
      clients = await Client.findAll({
        include: WorkItem,
      });
    }

    if (!clients) {
      return res.status(404).json({ error: 'Client not found.' });
    }

    res.json(clients);
  } catch (error) {
    console.error('Error retrieving clients:', error);
    res.status(500).json({ error: 'An error occurred while retrieving clients.' });
  }
});

// PUT route to update client status
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Check if the provided status value is valid
    const validStatusValues = ['approved', 'rejected']; // Update with your enum values
    if (!validStatusValues.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    // Update the status
    client.status = status;
    await client.save();

    return res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({ error: 'An error occurred while updating status' });
  }
});






module.exports = router;