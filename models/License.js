const mongoose = require("mongoose");

const licenseSchema = new mongoose.Schema({
  name: String,
  vendor: String,
  key: String,
  startDate: Date,
  expiryDate: Date,
  assignedTo: String, // optional user or device
});

module.exports = mongoose.model("License", licenseSchema);