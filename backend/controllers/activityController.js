const Activity = require('../models/Activity');

// Get all activities
const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    res.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
};

// Create a new activity
const createActivity = async (req, res) => {
  try {
    const { activity, percentagesplit } = req.body;
    const newActivity = await Activity.create({ activity, percentagesplit });
    res.json(newActivity);
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({ error: "Failed to create activity" });
  }
};

// Update an activity
const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { activity, percentagesplit } = req.body;
    const activityobj = await Activity.update({ activity, percentagesplit }, { where: { id } });
    res.json(activityobj);
  } catch (error) {
    console.error("Error updating activity:", error);
    res.status(500).json({ error: "Failed to update activity" });
  }
};

// Delete an activity
const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    await Activity.destroy({ where: { id } });
    res.json(id);
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ error: "Failed to delete activity" });
  }
};

module.exports = {
  getAllActivities,
  createActivity,
  updateActivity,
  deleteActivity,
};
