const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open"
  },
  submittedBy: String,     // could be email or user name
  assignedTo: String,      // IT staff
  asset: String,           // optional: asset name or ID
  createdAt: {
    type: Date,
    default: Date.now,
  },
  priority: String,
});

module.exports = mongoose.model("Ticket", ticketSchema);