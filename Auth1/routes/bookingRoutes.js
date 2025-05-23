const express = require('express');
const {
  createBooking, getBookings, updateBooking, cancelBooking,
  approveBooking, rejectBooking, deleteBooking
} = require('../controllers/bookingController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(authenticateToken);

router.post('/', authorizeRoles('user'), createBooking);
router.get('/', getBookings);
router.put('/:id', authorizeRoles('user'), updateBooking);
router.delete('/:id', authorizeRoles('user'), cancelBooking);
router.patch('/:id/approve', authorizeRoles('admin'), approveBooking);
router.patch('/:id/reject', authorizeRoles('admin'), rejectBooking);
router.delete('/:id', authorizeRoles('admin'), deleteBooking);

module.exports = router;
