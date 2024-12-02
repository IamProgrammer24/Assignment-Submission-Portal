import express from "express";
import isAuthenticated from "../Middlewares/isAuthenticated.js";
import {
  acceptAssignment,
  getAssignments,
  login,
  register,
  rejectAssignment,
} from "../Controllers/admin.controller.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/assignments").get(isAuthenticated, getAssignments);
router.route("/assignments/:id/accept").post(isAuthenticated, acceptAssignment);
router.route("/assignments/:id/reject").post(isAuthenticated, rejectAssignment);

export default router;
