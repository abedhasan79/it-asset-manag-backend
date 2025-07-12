const License = require("../models/License");

exports.getLicenses = async (req, res) => {
  const licenses = await License.find();
  res.json(licenses);
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