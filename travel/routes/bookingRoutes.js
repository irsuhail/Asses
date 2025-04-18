const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking
} = require('./controllers/bookingController');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', createBooking);
router.get('/', getBookings);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

module.exports = router;
