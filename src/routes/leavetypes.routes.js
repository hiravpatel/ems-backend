import express from "express";
import { createLeaveType, getAllLeaveType, updateLeaveType, deleteLeaveType } from "../controllers/leavetypes.controller.js"
import { verifyAdmin } from "../middlewares/verifyAdmin.js"

const router = express.Router();

// Create LeaveType
router.post("/", verifyAdmin, createLeaveType);

//Get All LeaveType
router.get("/", verifyAdmin, getAllLeaveType);

// Update LeaveType
router.put("/:id", verifyAdmin, updateLeaveType);

// Delete LeaveType
router.delete("/:id", verifyAdmin, deleteLeaveType);

export default router;