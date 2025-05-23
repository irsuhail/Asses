const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  service: String,
  datetime: Date,
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'cancelled'], default: 'pending' }
});

module.exports = mongoose.model('Booking', bookingSchema);
