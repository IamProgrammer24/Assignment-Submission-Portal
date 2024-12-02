// Model
import mongoose from "mongoose";

// Define the User schema
const assignmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

// Create the User model using the schema
const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
