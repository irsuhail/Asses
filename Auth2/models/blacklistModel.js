const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  token: String,
  blacklistedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Blacklist', schema);
