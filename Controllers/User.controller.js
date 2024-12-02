// Model
import Admin from "../models/Admin.model.js";
import Assignment from "../models/assignment.model.js";
import User from "../models/User.model.js";
import jwt from "jsonwebtoken";

// Module
import bcrypt from "bcrypt";

// Register User
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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already registered.",
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

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Save the new user to the database
    const user = await newUser.save();

    // Send a success response with some user details (but not the password)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
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

// Login User
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

    // Find the user by email in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found. Please register first.",
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password. Please try again.",
      });
    }

    // Generate a JWT token for the user
    const payload = {
      userId: user._id,
      email: user.email,
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
        user: {
          name: user.name,
          email: user.email,
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
// Upload Assignment
export const upload = async (req, res) => {
  try {
    // Destructure the task and admin from the request body
    const { task, admin } = req.body;

    // Basic validation: Ensure both task and admin are provided
    if (!task || !admin) {
      return res.status(400).json({
        message: "Please provide both task and admin fields.",
      });
    }

    // Get the userId from the token
    const userId = req.user.userId;

    // Check if the user exists in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Create a new assignment instance
    const newAssignment = new Assignment({
      userId,
      task,
      admin,
    });

    // Save the assignment to the database
    const assignment = await newAssignment.save();

    // Send the success response
    return res.status(201).json({
      message: "Assignment submitted successfully.",
      assignment,
    });
  } catch (err) {
    // Error handling
    console.error(err); // Log the error for debugging purposes
    return res.status(500).json({
      message: "Something went wrong.",
      error: err.message, // Include error message for debugging
    });
  }
};

// Get Admin Details
export const getAdmin = async (req, res) => {
  try {
    // Fetch all admins from the database
    const admins = await Admin.find();

    if (admins.length === 0) {
      return res.status(404).json({
        message: "No admins found.",
      });
    }

    // Extract the necessary fields from each admin using map
    const adminDetails = admins.map((admin) => ({
      adminId: admin._id, // MongoDB _id as adminId
      name: admin.name, // Admin's name
    }));

    // Send a successful response with the details of the admins
    return res.status(200).json({
      message: "All admin details retrieved successfully.",
      admins: adminDetails, // List of admins with selected fields
    });
  } catch (err) {
    // Error handling
    console.error(err); // Log the error for debugging purposes
    return res.status(500).json({
      message: "Something went wrong.",
      error: err.message, // Include error message for debugging
    });
  }
};
