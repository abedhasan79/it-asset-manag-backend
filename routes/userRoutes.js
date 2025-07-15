const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getCurrentUser, getClinicInfo } = require('../controllers/userController');

router.get('/me', auth, getCurrentUser);
router.get('/clinic', auth, getClinicInfo);

module.exports = router;