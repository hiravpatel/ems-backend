import express from "express";
import {verifyUser} from "../middlewares/verifyUser.js"
import {verifyAdmin} from "../middlewares/verifyAdmin.js";
import { applyLeave, getUserLeaves, getAllLeaves, getLeaveById, updateLeaveStatus } from "../controllers/leave.controller.js";

const router = express.Router();

// Apply for Leave (Employee)
router.post("/", verifyUser, applyLeave);

// Get all Leaves(User)
// User will get all leaves
router.get("/", verifyUser, getUserLeaves);

// Get all Leaves(Admin)
// Admin will Get All Leaves
router.get("/allLeave", verifyAdmin, getAllLeaves);

// Get Leave by id
router.get("/allLeave/:id", verifyAdmin, getLeaveById);


// Update leave status (Admin)
// Admin approve/reject Leave
router.put("/:id/status", verifyAdmin, updateLeaveStatus);

export default router;