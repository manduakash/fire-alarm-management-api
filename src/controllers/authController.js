// src/controllers/authController.js

const User = require("../models/userModel");

// Login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ status: 0, message: "User not found", token: null });
    }
    const isValidPassword = await user.comparePassword(req.body.password);
    if (!isValidPassword) {
      return res.status(401).json({status: 0, message: "Invalid password", token: null });
    }
    const token = await user.generateToken();
    res.json({ status: 1, message: "Logged in successfully", token: token });
  } catch (error) {
    res.status(500).json({status: 0, message: "Login failed", message: "Internal Server Error", token: null });
  }
};
