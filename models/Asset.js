const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' },
  name: String,
  type: String,
  serialNumber: String,
  location: String,
  purchaseDate: Date,
  warrantyExpiry: Date,
  notes: String
});

module.exports = mongoose.model('Asset', assetSchema);