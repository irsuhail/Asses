
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: Number,
  genre: String,
  available: { type: Boolean, default: true }
});

export default mongoose.model("Book", bookSchema);
