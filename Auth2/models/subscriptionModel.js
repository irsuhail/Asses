const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  plan: { type: String, enum: ["free", "premium", "pro"] },
  startDate: Date,
  expiryDate: Date,
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
