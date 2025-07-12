const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.requireRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: `Access denied (${role} only)` });
  }
  next();
};