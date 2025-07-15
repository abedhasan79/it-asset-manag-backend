const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  name: String,
  address: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Clinic', clinicSchema);