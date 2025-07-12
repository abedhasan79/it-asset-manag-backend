const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  name: String,
  type: String,
  serialNumber: String,
  purchaseDate: Date,
  warrantyExpiry: Date,
  assignedTo: String,
  location: String,
});

module.exports = mongoose.model("Asset", assetSchema);