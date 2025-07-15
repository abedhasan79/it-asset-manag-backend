const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset
} = require('../controllers/assetController');

// Protected routes
router.post('/', auth, createAsset);
router.get('/', auth, getAssets);
router.get('/:id', auth, getAssetById);
router.put('/:id', auth, updateAsset);
router.delete('/:id', auth, deleteAsset);

module.exports = router;