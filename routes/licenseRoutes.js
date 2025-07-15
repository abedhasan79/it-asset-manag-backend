const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createLicense,
  getLicenses,
  getLicenseById,
  updateLicense,
  deleteLicense,
  summaryLicense
} = require('../controllers/licenseController');

// Protected Routes
router.post('/', auth, createLicense);
router.get('/', auth, getLicenses);
router.get('/summary', auth, summaryLicense);
router.get('/:id', auth, getLicenseById);

router.put('/:id', auth, updateLicense);
router.delete('/:id', auth, deleteLicense);

module.exports = router;