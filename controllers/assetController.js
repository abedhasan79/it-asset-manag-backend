const Asset = require('../models/Asset');

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