import express from "express";
import { processPayroll, getAllPayrolls, getPayrollByEmployee  } from "../controllers/payroll.controller.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

// Admin Process payroll
router.post("/process", verifyAdmin, processPayroll);

// Get all payrolls
router.get("/", verifyAdmin, getAllPayrolls);

// Get Payroll by employee
router.get("/:employeeId", verifyAdmin, getPayrollByEmployee);

export default router;