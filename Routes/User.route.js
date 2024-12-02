import express from "express";
import {
  getAdmin,
  login,
  register,
  upload,
} from "../Controllers/User.controller.js";
import isAuthenticated from "../Middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/upload").post(isAuthenticated, upload);
router.route("/admins").get(isAuthenticated, getAdmin);

export default router;
