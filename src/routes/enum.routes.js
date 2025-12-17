import express from "express";
import { getEnums } from "../controllers/enum.controller.js";

const router = express.Router();

router.get("/", getEnums);

export default router;