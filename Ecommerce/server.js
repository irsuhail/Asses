const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const orderRoutes = require("./routes/orders");
const analyticsRoutes = require("./routes/analytics");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error", err));

app.use("/orders", orderRoutes);
app.use("/analytics", analyticsRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(3000,()=>{
    console.log(colors.rainbow("server started on http://localhost:3000"));
})

