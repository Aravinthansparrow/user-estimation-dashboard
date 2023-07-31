// complexityController.js

const Complexity = require('../models/Complexity');

// Update complexity
const updateComplexity = async (req, res) => {
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
};

// Get all complexities
const getAllComplexities = async (req, res) => {
  try {
    const complexities = await Complexity.findAll();
    res.json(complexities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new complexity
const createComplexity = async (req, res) => {
  try {
    const { complexity, days } = req.body;

    // Create a new complexity entry
    const newComplexity = await Complexity.create({ complexity, days });

    res.status(201).json({ message: 'Complexity entry created successfully', complexity: newComplexity });
  } catch (error) {
    console.error('Error creating complexity entry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  updateComplexity,
  getAllComplexities,
  createComplexity,
};
