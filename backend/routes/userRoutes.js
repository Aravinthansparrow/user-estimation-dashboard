// userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User login
router.post("/", userController.loginUser);

// Get user details by ID
router.get("/:id", userController.getUserById);

// Update user password by ID
router.put("/:id", userController.updateUserPassword);

module.exports = router;
