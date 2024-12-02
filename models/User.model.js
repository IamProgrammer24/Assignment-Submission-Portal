// Model
import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    assignments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
    },
  },
  { timestamps: true }
);

// Create the User model using the schema
const User = mongoose.model("User", userSchema);

export default User;
