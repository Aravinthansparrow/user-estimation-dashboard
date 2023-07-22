const express = require('express');
const Component = require('../models/Component');
const router = express.Router();

// Fetch all components
router.get('/', async (req, res) => {
  try {
    const components = await Component.findAll();
    res.status(200).json(components);
  } catch (error) {
    console.error('Error fetching components:', error);
    res.status(500).json({ error: 'Error fetching components' });
  }
});

// Create a new component
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const component = await Component.create({ name });
    res.status(201).json(component);
  } catch (error) {
    console.error('Error creating component:', error);
    res.status(500).json({ error: 'Error creating component' });
  }
});

// Update a component
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isDefault } = req.body;

    const component = await Component.findByPk(id);
    if (!component) {
      return res.status(404).json({ error: 'Component not found' });
    }

    if (isDefault === true && component.default !== 'default') {
      // Set the previously set default component as not default
      await Component.update({ default: 'not default' }, { where: { default: 'default' } });

      // Update the component's name and default status
      component.name = name;
      component.default = 'default';
    } else {
      // Update the component's name
      component.name = name;
    }

    await component.save();

    res.status(200).json(component);
  } catch (error) {
    console.error('Error updating component:', error);
    res.status(500).json({ error: 'Error updating component' });
  }
});




// Delete a component
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const component = await Component.findByPk(id);
    if (!component) {
      return res.status(404).json({ error: 'Component not found' });
    }

    await component.destroy();

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting component:', error);
    res.status(500).json({ error: 'Error deleting component' });
  }
});

module.exports = router;