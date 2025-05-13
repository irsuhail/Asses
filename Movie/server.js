const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const watchHistoryRoutes = require("./routes/watch.js");
const analyticsRoutes = require("./routes/analytics");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(() => console.log("MongoDB connection error"));

app.use("/watch-history", watchHistoryRoutes);
app.use("/analytics", analyticsRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
