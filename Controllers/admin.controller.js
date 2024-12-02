// Model
import Admin from "../models/Admin.model.js";
import Assignment from "../models/assignment.model.js";
import jwt from "jsonwebtoken";

// Module
import bcrypt from "bcrypt";

// Register Admin
export const register = async (req, res) => {
  try {
    // Destructure data from the request body
    const { name, email, password } = req.body;

    // Basic validation: Ensure all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide all required fields (name, email, password).",
      });
    }

    // Check if the user already exists in the database by email
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin with this email already registered.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password should be at least 6 characters long.",
      });
    }

    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new Admin instance
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Save the new user to the database
    const admin = await newAdmin.save();

    // Send a success response with some user details (but not the password)
    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (err) {
    // Error handling
    console.error(err); // Log error for debugging purposes
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message, // Include error message in the response for debugging
    });
  }
};

// Login Admin
export const login = async (req, res) => {
  try {
    // Destructure data from the request body
    const { email, password } = req.body;

    // Basic validation: Ensure both fields are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide both email and password.",
      });
    }

    // Find the Admin by email in the database
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        message: "Admin not found. Please register first.",
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password. Please try again.",
      });
    }

    // Generate a JWT token for the user
    const payload = {
      userId: admin._id,
      email: admin.email,
    };
    const token = jwt.sign(
      payload, // Payload (user information to encode in the token)
      process.env.JWT_SECRET, // Secret key to sign the token
      { expiresIn: "1h" } // Token expiration time
    );

    // Send the response with the token and user info (excluding password)
    res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // Token expire duration
        httpOnly: true, // ENSURE THE TOKEN IS NOT ACCESSIBLE BY JAVASCRIPT (FOR SECURITY).
        sameSite: "strict", // PREVENT CROSS-SITE REQUEST FORGERY (CSRF).
      })
      .json({
        message: "Login successful",
        admin: {
          name: admin.name,
          email: admin.email,
        },
      });
  } catch (err) {
    // Error handling
    console.error(err); // Log error for debugging purposes
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message, // Include error message for debugging
    });
  }
};

// Get Assignments
export const getAssignments = async (req, res) => {
  try {
    // Destructure adminId from the authenticated user's data (assuming JWT middleware has set req.user)
    const { userId: adminId } = req.user;

    // Fetch assignments for the specific adminId
    const assignments = await Assignment.find({ admin: adminId }).select(
      "-admin"
    );

    // Check if there are no assignments found
    if (assignments.length === 0) {
      return res.status(404).json({
        message: "No assignments found assigned to you.",
      });
    }
    return res.status(200).json({
      message: "Assignments retrieved successfully.",
      assignments: assignments,
    });
  } catch (err) {
    // Error handling
    return res.status(500).json({
      message: "Something went wrong.",
      error: err.message, // Include error message to help debug
    });
  }
};

// Accept assignment
export const acceptAssignment = async (req, res) => {
  try {
    const { id } = req.params; // Extract assignment ID from URL parameters

    // Find the assignment by ID
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    // Check if the current status is "pending" before accepting it
    if (assignment.status === "accepted") {
      return res.status(400).json({
        message: "Assignment has already been accepted",
      });
    }

    // Update assignment status to "accepted"
    assignment.status = "accepted";

    // Save the updated assignment
    await assignment.save();

    return res.status(200).json({
      message: "Assignment accepted successfully",
      assignment,
    });
  } catch (err) {
    console.error(err); // Log error for debugging
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// Reject assignment
export const rejectAssignment = async (req, res) => {
  try {
    const { id } = req.params; // Extract assignment ID from URL parameters

    // Find the assignment by ID
    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found",
      });
    }

    // Check if the current status is "pending" before rejecting it
    if (assignment.status === "rejected") {
      return res.status(400).json({
        message: "Assignment has already been rejected",
      });
    }

    // Update assignment status to "rejected"
    assignment.status = "rejected";

    // Save the updated assignment
    await assignment.save();

    return res.status(200).json({
      message: "Assignment rejected successfully",
      assignment,
    });
  } catch (err) {
    console.error(err); // Log error for debugging
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};
