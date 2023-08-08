const WorkItem = require('../models/WorkItem');

// Create a new work item
const createWorkItem = async (req, res) => {
  try {
    const { clientId, module, userType, appType, componentName, comments, description, componentType, complexity, buildEffort, effortOverride, finalEffort } = req.body;
    const workItem = await WorkItem.create({ clientId, module, userType, appType, componentName, comments, description, componentType, complexity, buildEffort, effortOverride, finalEffort });
    res.status(201).json(workItem);
  } catch (error) {
    console.error('Error creating work item:', error);
    res.status(500).json({ error: 'An error occurred while creating the work item.' });
  }
};

// Get all work items for a specific client
const getWorkItemsByClientId = async (req, res) => {
  try {
    const clientId = req.query.clientId;

    if (!clientId) {
      return res.status(400).json({ error: 'Client ID is required' });
    }

    const workItems = await WorkItem.findAll({
      where: {
        clientId: clientId
      }
    });

    res.json(workItems);
  } catch (error) {
    console.error('Error retrieving work items:', error);
    res.status(500).json({ error: 'An error occurred while retrieving work items.' });
  }
};

module.exports = {
  createWorkItem,
  getWorkItemsByClientId,
};
