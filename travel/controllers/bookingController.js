const Booking = require('../models/Booking');
const sendEmail = require('../utils/mailer');
const User = require('../models/User');

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, user: req.user.id });

    const user = await User.findById(req.user.id);
    await sendEmail(
      user.email,
      'Booking Confirmation',
      `Booking to ${booking.destination} on ${booking.date} is confirmed.`
    );

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  const query = req.user.role === 'admin' ? {} : { user: req.user.id };
  const bookings = await Booking.find(query);
  res.json(bookings);
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (req.user.role !== 'admin' && booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (req.user.role !== 'admin' && booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Booking.findByIdAndDelete(req.params.id);

    const user = await User.findById(booking.user);
    await sendEmail(
      user.email,
      'Booking Cancelled',
      `Your booking to ${booking.destination} on ${booking.date} has been cancelled.`
    );

    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
