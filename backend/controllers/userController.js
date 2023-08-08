const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const { role, username, id } = user;
        res.json({ role, username, id, email });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user details by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (user) {
      const { role, username, email } = user;
      res.json({ id, role, username, email });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update user password by ID
const updateUserPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const userId = req.params.id;

    const user = await User.findByPk(userId);

    if (user) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      user.password = hashedPassword;
      await user.save();

      res.sendStatus(200);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  loginUser,
  getUserById,
  updateUserPassword,
};
