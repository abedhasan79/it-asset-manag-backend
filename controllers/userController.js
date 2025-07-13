const User = require("../models/User");

// Get all users (optional: filter by role)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // omit passwords
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Get only IT staff
const getITStaff = async (req, res) => {
  try {
    const users = await User.find({ role: "it" }).select("-password");
    res.json(users);
  } catch (err) {
    console.error("Error fetching IT staff:", err);
    res.status(500).json({ message: "Failed to fetch IT staff" });
  }
};

module.exports = {
  getAllUsers,
  getITStaff,
};