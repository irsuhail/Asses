const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  destination: String,
  date: String,
  people: Number
});

module.exports = mongoose.model('Booking', bookingSchema);
