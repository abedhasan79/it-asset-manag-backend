const mongoose = require('mongoose');

const licenseSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' },
  softwareName: String,
  licenseKey: String,
  purchaseDate: Date,
  renewalDate: Date,
  notes: String
});

module.exports = mongoose.model('License', licenseSchema);