const mongoose = require("mongoose");

const licenseSchema = new mongoose.Schema({
  name: String,
  vendor: String,
  key: String,
  startDate: Date,
  expiryDate: Date,
  seats: Number,
  assignedTo: String, // optional user or device
  status: String,
});

module.exports = mongoose.model("License", licenseSchema);