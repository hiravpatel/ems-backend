import { processPayrollService, getAllPayrollsService, getPayrollByEmployeeService } from "../services/payroll.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

// Admin Process payroll
export const processPayroll = async (req, res) => {
    try {
        const {employeeId, month} = req.body;

        const payroll = await processPayrollService(employeeId, month);

        return successResponse(res, "Payroll processed successfully", payroll, 201);
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Server Error", 500, error.message);
    }
}

// Get all payrolls 
export const getAllPayrolls = async (req, res) => {
    try {
        const payrolls = await getAllPayrollsService();
        return successResponse(res, "All Payroll fetched successfully", payrolls, 200);
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Server Error", 500, error.message);
    }
}

// Get Payroll by employee
export const getPayrollByEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const payrolls = await getPayrollByEmployeeService(Number(employeeId));
        return successResponse(res, "Employee Payroll fetched successfully", payrolls, 200);
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Server Error", 500, error.message);
    }
}