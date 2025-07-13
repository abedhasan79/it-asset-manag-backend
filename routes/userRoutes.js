const express = require("express");
const router = express.Router();
const { getAllUsers, getITStaff } = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/it", getITStaff);

module.exports = router;