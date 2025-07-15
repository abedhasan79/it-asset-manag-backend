const Asset = require('../models/Asset');
const mongoose = require('mongoose');
// Create new asset
exports.createAsset = async (req, res) => {
  try {
    const { name, type, serialNumber, location, purchaseDate, warrantyExpiry, notes } = req.body;

    const newAsset = new Asset({
      clinicId: req.user.clinicId,
      name,
      type,
      serialNumber,
      location,
      purchaseDate,
      warrantyExpiry,
      notes
    });

    await newAsset.save();
    res.status(201).json(newAsset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create asset' });
  }
};

// Get all assets for user's clinic
exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.find({ clinicId: req.user.clinicId }).sort({ createdAt: -1 });
    res.json(assets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
};

// Get single asset by ID
exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findOne({
      _id: req.params.id,
      clinicId: req.user.clinicId
    });

    if (!asset) return res.status(404).json({ error: 'Asset not found' });

    res.json(asset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch asset' });
  }
};

// Update asset
exports.updateAsset = async (req, res) => {
  try {
    const updated = await Asset.findOneAndUpdate(
      { _id: req.params.id, clinicId: req.user.clinicId },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Asset not found' });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update asset' });
  }
};

// Delete asset
exports.deleteAsset = async (req, res) => {
  try {
    const deleted = await Asset.findOneAndDelete({
      _id: req.params.id,
      clinicId: req.user.clinicId
    });

    if (!deleted) return res.status(404).json({ error: 'Asset not found' });

    res.json({ message: 'Asset deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete asset' });
  }
};

exports.summaryAsset = async (req, res) => {
  try {
    const clinicObjectId = new mongoose.Types.ObjectId(req.user.clinicId);

    // 1. Total asset count
    const totalAssets = await Asset.countDocuments({ clinicId: clinicObjectId });

    // 2. Assets grouped by type
    const assetsByTypeAgg = await Asset.aggregate([
      { $match: { clinicId: clinicObjectId } },
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    const assetsByType = assetsByTypeAgg.map(({ _id, count }) => ({ type: _id, count }));

    // 3. Assets with warranty expiring in the next 30 days
    const today = new Date();
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    const expiringWarranties = await Asset.find({
      clinicId: clinicObjectId,
      warrantyExpiry: { $gte: today, $lte: next30Days }
    }).select('name type warrantyExpiry');

    // Return all summary data
    res.json({
      totalAssets,
      assetsByType,
      expiringWarranties,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch asset summary' });
  }
};