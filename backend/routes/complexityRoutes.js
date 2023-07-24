const express = require('express');
const router = express.Router();
const Complexity = require('../models/Complexity');

// PUT route to update complexity
router.put('/', async (req, res) => {
  try {
    
    const { complexity, days, complexityId } = req.body;

    // Update the complexity entry
    const updatedComplexity = await Complexity.update(
      { complexity, days },
      { where: { id: complexityId } }
    );

    if (updatedComplexity[0] === 0) {
      // If no rows were updated, the complexity with the given id doesn't exist
      return res.status(404).json({ error: 'Complexity not found' });
    }

    res.status(200).json({ message: 'Complexity updated successfully' });
  } catch (error) {
    console.error('Error updating complexity:', error);
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

// POST route to create complexity
router.post('/', async (req, res) => {
  try {
    const { complexity, days } = req.body;

    // Create a new complexity entry
    const newComplexity = await Complexity.create({ complexity, days });

    res.status(201).json({ message: 'Complexity entry created successfully', complexity: newComplexity });
  } catch (error) {
    console.error('Error creating complexity entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;