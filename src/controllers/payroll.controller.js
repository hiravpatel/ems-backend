import {
  processPayrollService,
  getAllPayrollsService,
  getPayrollByEmployeeService,
  getMyPayrollsService,
  getPayrollByIdService
} from "../services/payroll.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

// Admin Process payroll
export const processPayroll = async (req, res) => {
  try {
    const { employeeId, month } = req.body;

    const payroll = await processPayrollService(employeeId, month);

    return successResponse(res, "Payroll processed successfully", payroll, 201);
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Server Error", 500, error.message);
  }
};

// Get all payrolls
export const getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await getAllPayrollsService();
    return successResponse(
      res,
      "All Payroll fetched successfully",
      payrolls,
      200
    );
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Server Error", 500, error.message);
  }
};

// Get Payroll by employee
export const getPayrollByEmployee = async (req, res) => {
  try {
    const { payrollId } = req.params;
    const payrolls = await getPayrollByEmployeeService(Number(payrollId));
    return successResponse(res, "Payroll fetched successfully", payrolls, 200);
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Server Error", 500, error.message);
  }
};

// Get all payroll (user)
export const getMyPayrolls = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const payrolls = await getMyPayrollsService(employeeId);
    return successResponse(res, "Payroll fetched successfully", payrolls, 200);
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Server Error", 500, error.message);
  }
};

// Employee Salary Slip by id
export const getPayrollById = async (req, res) => {
  try {
    const payroll = await getPayrollByIdService(Number(req.params.id), req.user.id);
    return successResponse(res, "Payroll fetched successfully", payroll, 200);
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Server Error", 500, error.message);
  }
}