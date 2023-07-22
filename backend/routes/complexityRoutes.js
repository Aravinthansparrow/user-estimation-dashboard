const express = require('express');
const router = express.Router();
const Complexity = require('../models/Complexity');

// POST route to save complexity
router.post('/', async (req, res) => {
    try {
      // Truncate the table
      await Complexity.destroy({ truncate: true });
  
      // Create a new complexity entry
      const { complexity, days } = req.body;
      await Complexity.create({ complexity, days });
  
      res.status(201).json({ message: 'Complexity entry created successfully' });
    } catch (error) {
      console.error('Error creating complexity entry:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// GET route to fetch all complexities
router.get('/', async (req, res) => {
  try {
    const complexities = await Complexity.findAll();
    res.json(complexities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
