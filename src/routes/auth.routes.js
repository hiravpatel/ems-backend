import express from "express";
import {
  loginController,
  sendOtp,
  verifyOtp,
  changePassword,
} from "../controllers/auth.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/login", loginController);

router.post("/forgot-password", sendOtp);

router.post("/verify-otp", verifyOtp);

router.post("/change-password", verifyUser, changePassword);

export default router;
