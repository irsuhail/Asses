// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());


app.use("/books", bookRoutes);


mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/libraryDB")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error(err));
