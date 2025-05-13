const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


router.get("/top-products", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: "$productName", totalSold: { $sum: "$quantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 3 }
    ]);
    if (!result.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.get("/revenue-by-category", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: "$category", totalRevenue: { $sum: "$totalPrice" } } }
    ]);
    if (!result.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.get("/average-order-value", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $group: { _id: null, avgOrderValue: { $avg: "$totalPrice" } } }
    ]);
    if (!result.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(result[0]);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.get("/orders-per-month", async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$orderDate" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);
    if (!result.length) return res.status(200).json({ message: "No data found" });
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.get("/cancellation-rate", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const cancelledOrders = await Order.countDocuments({ status: "Cancelled" });

    if (totalOrders === 0) return res.status(200).json({ message: "No data found" });

    const rate = (cancelledOrders / totalOrders) * 100;
    res.status(200).json({ cancellationRate: rate.toFixed(2) + "%" });
  } catch {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
