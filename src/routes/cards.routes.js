import express from "express";
import { dashboardCards } from "../controllers/cards.controller.js";

const router = express.Router();

router.get("/dashboard-cards", dashboardCards);

export default router;