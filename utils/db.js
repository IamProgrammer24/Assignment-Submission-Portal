import mongoose from "mongoose"; // Import mongoose library for MongoDB interactions

// Create an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the connection string in the environment variable
    await mongoose.connect(process.env.MONGO_URI); // process.env.MONGO_URI contains the MongoDB URI
    console.log("mongodb connected successfully"); // Log a success message if connection is established
  } catch (error) {
    // If there is an error during the connection process, catch it and log the error message
    console.log(error); // This will print the error details to the console
  }
};

// Export the connectDB function for use in other parts of the application
export default connectDB;
