const Content = require("../models/contentModel");
const User = require("../models/userModel");

exports.getFreeContent = async (req, res) => {
  const content = await Content.find({ type: "free" });
  res.send(content);
};

exports.getPremiumContent = async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!["premium", "pro"].includes(user.subscription)) {
    return res.status(403).send("Upgrade your subscription to access this content");
  }

  const content = await Content.find();
  res.send(content);
};

exports.createContent = async (req, res) => {
  const { title, type, description } = req.body;
  const content = new Content({ title, type, description });
  await content.save();
  res.status(201).send("Content created");
};

exports.deleteContent = async (req, res) => {
  const { id } = req.params;
  await Content.findByIdAndDelete(id);
  res.send("Content deleted");
};
