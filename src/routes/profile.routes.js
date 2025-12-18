import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import {
  getMyProfile,
  saveBasicInfo,
  savePersonalInfo,
  saveEducationInfo,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/me", verifyUser, getMyProfile);
router.post("/basic", verifyUser, saveBasicInfo);
router.post("/personal", verifyUser, savePersonalInfo);
router.post("/education", verifyUser, saveEducationInfo);

export default router;
