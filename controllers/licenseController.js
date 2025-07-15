const License = require('../models/License');

// Create a new license
exports.createLicense = async (req, res) => {
  try {
    const { softwareName, licenseKey, purchaseDate, renewalDate, notes } = req.body;

    const newLicense = new License({
      clinicId: req.user.clinicId,
      softwareName,
      licenseKey,
      purchaseDate,
      renewalDate,
      notes
    });

    await newLicense.save();
    res.status(201).json(newLicense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create license' });
  }
};

// Get all licenses for clinic
exports.getLicenses = async (req, res) => {
  try {
    const licenses = await License.find({ clinicId: req.user.clinicId }).sort({ renewalDate: 1 });
    res.json(licenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch licenses' });
  }
};

// Get single license by ID
exports.getLicenseById = async (req, res) => {
  try {
    const license = await License.findOne({
      _id: req.params.id,
      clinicId: req.user.clinicId
    });

    if (!license) return res.status(404).json({ error: 'License not found' });

    res.json(license);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch license' });
  }
};

// Update license
exports.updateLicense = async (req, res) => {
  try {
    const updated = await License.findOneAndUpdate(
      { _id: req.params.id, clinicId: req.user.clinicId },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'License not found' });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update license' });
  }
};

// Delete license
exports.deleteLicense = async (req, res) => {
  try {
    const deleted = await License.findOneAndDelete({
      _id: req.params.id,
      clinicId: req.user.clinicId
    });

    if (!deleted) return res.status(404).json({ error: 'License not found' });

    res.json({ message: 'License deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete license' });
  }
};