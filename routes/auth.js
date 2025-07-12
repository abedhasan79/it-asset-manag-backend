const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

router.get("/me", authMiddleware, (req, res) => {
  res.json(req.user); // sent from middleware
});

module.exports = router;