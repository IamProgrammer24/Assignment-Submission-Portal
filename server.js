// LIBRARYS //
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// UTILS //
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

// ROUTES //
import userRoute from "./Routes/User.route.js";
import adminRoute from "./Routes/Admin.route.js";

dotenv.config({});

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// API'S
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);

app.listen(PORT, () => {
  // CONNECT TO THE DATABASE WHEN SERVER START
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
