import express from "express";
import { processPayroll, getAllPayrolls, getPayrollByEmployee, getMyPayrolls, getPayrollById } from "../controllers/payroll.controller.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router();

// Admin Process payroll
router.post("/process", verifyAdmin, processPayroll);

// Get all payrolls
router.get("/all", verifyAdmin, getAllPayrolls);

// Get all Payroll (user)
router.get("/my", verifyUser, getMyPayrolls);

// Employee salary slip by id
router.get("/my/:id", verifyUser, getPayrollById);

// Get Payroll by employee
router.get("/all/:payrollId", verifyAdmin, getPayrollByEmployee);

export default router;