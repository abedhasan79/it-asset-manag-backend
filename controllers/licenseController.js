const License = require("../models/License");

exports.getLicenses = async (req, res) => {
  try {
    const licenses = await License.find();

    const today = new Date();
    const enriched = licenses.map((lic) => ({
      ...lic.toObject(),
      status: new Date(lic.expiryDate) >= today ? "Active" : "Inactive",
    }));

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createLicense = async (req, res) => {
  const newLicense = new License(req.body);
  const saved = await newLicense.save();
  res.status(201).json(saved);
};

exports.updateLicense = async (req, res) => {
  const updated = await License.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteLicense = async (req, res) => {
  await License.findByIdAndDelete(req.params.id);
  res.json({ message: "License deleted" });
};