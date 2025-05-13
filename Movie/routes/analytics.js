const express = require("express");
const router = express.Router();
const WatchHistory = require("../models/WatchHistory");

// 1. Top 5 Most-Watched Movies (by total watchTime)
router.get("/top-movies", async (req, res) => {
  try {
    const result = await WatchHistory.aggregate([
      { $group: { _id: "$movie", totalWatchTime: { $sum: "$watchTime" } } },
      { $sort: { totalWatchTime: -1 } },
      { $limit: 5 }
    ]);
    if (!result.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 2. Genre Popularity (total watch time per genre)
router.get("/genre-popularity", async (req, res) => {
  try {
    const result = await WatchHistory.aggregate([
      { $group: { _id: "$genre", totalWatchTime: { $sum: "$watchTime" } } },
      { $sort: { totalWatchTime: -1 } }
    ]);
    if (!result.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 3. User Engagement (average watch time per user)
router.get("/user-engagement", async (req, res) => {
  try {
    const result = await WatchHistory.aggregate([
      { $group: { _id: "$username", avgWatchTime: { $avg: "$watchTime" } } }
    ]);
    if (!result.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 4. Subscription Watch Time (compare Free vs Premium)
router.get("/subscription-watchtime", async (req, res) => {
  try {
    const result = await WatchHistory.aggregate([
      { $group: { _id: "$subscriptionType", totalWatchTime: { $sum: "$watchTime" } } }
    ]);
    if (!result.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 5. Top 3 Highest-Rated Movies (by average rating)
router.get("/highest-rated-movies", async (req, res) => {
  try {
    const result = await WatchHistory.aggregate([
      { $group: { _id: "$movie", avgRating: { $avg: "$rating" } } },
      { $sort: { avgRating: -1 } },
      { $limit: 3 }
    ]);
    if (!result.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
