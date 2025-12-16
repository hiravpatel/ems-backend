import {
  findPayrollByEmployeeAndMonthRepo,
  findEmployeeByIdRepo,
  createPayrollRepo,
  getAllPayrollsRepo,
  getPayrollByEmployeeRepo
} from "../repository/payroll.repository.js";
import { calculatePayroll } from "../utils/calculatePayroll.js";

// Admin Process payroll
export const processPayrollService = async (employeeId, month) => {
  // Check if payroll already exists
  const existingPayroll = await findPayrollByEmployeeAndMonthRepo(
    employeeId,
    month
  );
  if (existingPayroll) {
    throw new Error(
      "Payroll already processed for this employee and this month."
    );
  }

  // Get employee + department salary
  const employee = await findEmployeeByIdRepo(employeeId);
  if (!employee) {
    throw new Error("Employee not found");
  }

  const { basicSalary, allowance, deduction } = employee.departmentSalary;

  const netSalary = calculatePayroll(basicSalary, allowance, deduction);

  // Save Payroll
  const payrollData = {
    employeeId,
    month,
    basicSalary,
    allowance,
    deduction,
    netSalary,
    payrollStatus: "UNPAID",
  };

  const createPayroll = await createPayrollRepo(payrollData);

  return createPayroll;
};

// Get all payrolls
export const getAllPayrollsService = async () => {
  return await getAllPayrollsRepo();
};

// Get Payroll by employee
export const getPayrollByEmployeeService = async (employeeId) => {
  return await getPayrollByEmployeeRepo(employeeId);
};
