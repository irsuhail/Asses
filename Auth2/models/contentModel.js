const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: String,
  type: { type: String, enum: ["free", "premium"], default: "free" },
  description: String,
});

module.exports = mongoose.model("Content", contentSchema);
