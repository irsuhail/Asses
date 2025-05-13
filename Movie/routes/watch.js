const express = require("express");
const router = express.Router();
const WatchHistory = require("../models/WatchHistory");

router.post("/", async (req, res) => {
  try {
    const record = new WatchHistory(req.body);
    await record.save();
    res.status(200).json({ message: "Watch history added successfully" });
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
