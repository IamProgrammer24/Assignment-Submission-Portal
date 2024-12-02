// Module
import mongoose from "mongoose";

// Define the Admin schema
const adminSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

// Create the Admin model using the schema
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
