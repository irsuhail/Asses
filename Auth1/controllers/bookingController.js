const Booking = require('../models/bookingModel');

async function createBooking(req, res) {
  const { service, datetime } = req.body;
  const booking = new Booking({ user: req.user.userId, service, datetime });
  await booking.save();
  res.status(201).json(booking);
}

async function getBookings(req, res) {
  const isAdmin = req.user.role === 'admin';
  const bookings = await Booking.find(isAdmin ? {} : { user: req.user.userId }).populate('user', 'username email');
  res.json(bookings);
}

async function updateBooking(req, res) {
  const booking = await Booking.findById(req.params.id);
  if (!booking || booking.user.toString() !== req.user.userId || booking.status !== 'pending') {
    return res.status(403).json({ message: 'Cannot update this booking' });
  }
  booking.service = req.body.service || booking.service;
  booking.datetime = req.body.datetime || booking.datetime;
  await booking.save();
  res.json(booking);
}

async function cancelBooking(req, res) {
  const booking = await Booking.findById(req.params.id);
  if (!booking || booking.user.toString() !== req.user.userId || booking.status !== 'pending') {
    return res.status(403).json({ message: 'Cannot cancel this booking' });
  }
  booking.status = 'cancelled';
  await booking.save();
  res.json({ message: 'Booking cancelled' });
}

async function approveBooking(req, res) {
  const booking = await Booking.findById(req.params.id);
  booking.status = 'approved';
  await booking.save();
  res.json({ message: 'Booking approved' });
}

async function rejectBooking(req, res) {
  const booking = await Booking.findById(req.params.id);
  booking.status = 'rejected';
  await booking.save();
  res.json({ message: 'Booking rejected' });
}

async function deleteBooking(req, res) {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: 'Booking deleted' });
}

module.exports = {
  createBooking,
  getBookings,
  updateBooking,
  cancelBooking,
  approveBooking,
  rejectBooking,
  deleteBooking
};
