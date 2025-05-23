const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
  token: String,
  expiry: Date,
});

module.exports = mongoose.model("Blacklist", blacklistSchema);
