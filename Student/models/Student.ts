import mongoose, { Document, Schema } from "mongoose";

export interface IStudent extends Document {
  name: string;
  email: string;
  age: number;
  course: "Web Development" | "Data Science" | "UI/UX";
}

const studentSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [5, "Age must be at least 5"],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      enum: ["Web Development", "Data Science", "UI/UX"],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IStudent>("Student", studentSchema);
