const Ticket = require("../models/Ticket");

exports.getTickets = async (req, res) => {
  const tickets = await Ticket.find().sort({ createdAt: -1 });
  res.json(tickets);
};

exports.createTicket = async (req, res) => {
  const newTicket = new Ticket(req.body);
  const saved = await newTicket.save();
  res.status(201).json(saved);
};

exports.updateTicket = async (req, res) => {
  const updated = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteTicket = async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  res.json({ message: "Ticket deleted" });
};