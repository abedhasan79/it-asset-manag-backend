const Asset = require("../models/Asset");

exports.getAssets = async (req, res) => {
  const assets = await Asset.find();
  res.json(assets);
};

exports.createAsset = async (req, res) => {
  const newAsset = new Asset(req.body);
  const saved = await newAsset.save();
  res.status(201).json(saved);
};

exports.updateAsset = async (req, res) => {
  const updated = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteAsset = async (req, res) => {
  await Asset.findByIdAndDelete(req.params.id);
  res.json({ message: "Asset deleted" });
};