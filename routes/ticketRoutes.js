const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  summaryTicket
} = require('../controllers/ticketController');

router.post('/', auth, createTicket);
router.get('/', auth, getTickets);
router.get('/summary', auth, summaryTicket);
router.get('/:id', auth, getTicketById);

router.put('/:id', auth, updateTicket);
router.delete('/:id', auth, deleteTicket);

module.exports = router;