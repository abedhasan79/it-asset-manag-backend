const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getCurrentUser, getClinicInfo, updateCurrentUser, updateUserInfo, changePassword } = require('../controllers/userController');

router.get('/me', auth, getCurrentUser);
router.get('/clinic', auth, getClinicInfo);
router.put('/me', auth, updateCurrentUser);
router.put('/me/info', auth, updateUserInfo);
router.put('/me/password', auth, changePassword);
module.exports = router;