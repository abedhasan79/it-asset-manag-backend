const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' },
  title: String,
  description: String,
  status: { type: String, default: 'open' }, // open, in-progress, closed
  priority: { type: String, default: 'medium' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);