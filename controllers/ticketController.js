const Ticket = require('../models/Ticket');
const mongoose = require('mongoose');
// Create new ticket
exports.createTicket = async (req, res) => {
  try {
    const { title, description, status = 'open', priority = 'medium' } = req.body;

    const ticket = new Ticket({
      clinicId: req.user.clinicId,
      title,
      description,
      status,
      priority
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
};

// Get all tickets for clinic
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ clinicId: req.user.clinicId }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

// Get ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
      clinicId: req.user.clinicId
    });

    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    res.json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
};

// Update ticket
exports.updateTicket = async (req, res) => {
  try {
    const updated = await Ticket.findOneAndUpdate(
      { _id: req.params.id, clinicId: req.user.clinicId },
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Ticket not found' });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update ticket' });
  }
};

// Delete ticket
exports.deleteTicket = async (req, res) => {
  try {
    const deleted = await Ticket.findOneAndDelete({
      _id: req.params.id,
      clinicId: req.user.clinicId
    });

    if (!deleted) return res.status(404).json({ error: 'Ticket not found' });

    res.json({ message: 'Ticket deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete ticket' });
  }
};

exports.summaryTicket = async (req, res) => {
  try {
    const clinicObjectId = new mongoose.Types.ObjectId(req.user.clinicId);

    const ticketsByStatusAgg = await Ticket.aggregate([
      {
        $match: {
          clinicId: clinicObjectId,
          status: { $ne: 'closed' } // Exclude closed tickets
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const ticketsByStatus = ticketsByStatusAgg.map(({ _id, count }) => ({
      status: _id,
      count
    }));

    res.json({ ticketsByStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch ticket summary' });
  }
};