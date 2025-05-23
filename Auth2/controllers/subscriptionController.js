const User = require("../models/userModel");

exports.subscribe = async (req, res) => {
  const { plan } = req.body;
  if (!["free", "premium", "pro"].includes(plan)) return res.status(400).send("Invalid plan");

  const user = await User.findById(req.user.userId);
  user.subscription = plan;
  user.subscriptionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  await user.save();

  res.send("Subscription updated");
};

exports.status = async (req, res) => {
  const user = await User.findById(req.user.userId);
  const expired = user.subscriptionExpiry && user.subscriptionExpiry < Date.now();

  if (expired) {
    user.subscription = "free";
    await user.save();
  }

  res.send({ plan: user.subscription, expired });
};

exports.renew = async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!user.subscriptionExpiry || user.subscriptionExpiry < Date.now()) {
    return res.status(400).send("Subscription expired, buy again");
  }

  user.subscriptionExpiry = new Date(user.subscriptionExpiry.getTime() + 30 * 24 * 60 * 60 * 1000);
  await user.save();
  res.send("Subscription renewed");
};

exports.cancel = async (req, res) => {
  const user = await User.findById(req.user.userId);
  user.subscription = "free";
  user.subscriptionExpiry = null;
  await user.save();
  res.send("Subscription cancelled");
};
