import puppeteer from "puppeteer";
import {
  findPayrollByEmployeeAndMonthRepo,
  findEmployeeByIdRepo,
  createPayrollRepo,
  getAllPayrollsRepo,
  getPayrollByEmployeeRepo,
  getMyPayrollsRepo,
  getPayrollByIdRepo
} from "../repository/payroll.repository.js";
import { calculatePayroll } from "../utils/calculatePayroll.js";
import { getSalarySlipTemplate } from "../utils/getSalarySlipTemplate.js";

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
    payrollStatus: "PAID",
  };

  const createPayroll = await createPayrollRepo(payrollData);

  return createPayroll;
};

// Get all payrolls
export const getAllPayrollsService = async (page, limit) => {
  const skip = (page - 1) * limit;

  const { payrolls, totalCount } = await getAllPayrollsRepo(skip, limit);

  return {
    payrolls,
    totalRecords: totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page
  };
};

// Get Payroll by employee
export const getPayrollByEmployeeService = async (payrollId) => {
  return await getPayrollByEmployeeRepo(payrollId);
};

// Get all payrolls (user)
export const getMyPayrollsService = async (employeeId) => {
  return await getMyPayrollsRepo(employeeId);
};

// Employee salary slip by id
export const getPayrollByIdService = async (payrollId, employeeId) => {
  const payroll = await getPayrollByIdRepo(payrollId, employeeId);

  if (!payroll) {
    throw new Error("PAYROLL_NOT_FOUND");
  }

  return payroll;
}

// Generate Salary slip PDF
export const generateSalarySlipPDF = async (payrollId, user) => {
  if (!user) throw new Error("User not provided");

  let payroll;

  if (user.role === "ADMIN") {
    payroll = await getPayrollByIdRepo(payrollId); // admin can fetch any payroll
  } else if (user.role === "EMPLOYEE") {
    payroll = await getPayrollByIdRepo(payrollId, user.id); // employee can fetch only their own
  } else {
    throw new Error("Unauthorized role");
  }

  if (!payroll) throw new Error("Payroll not found");

  const html = getSalarySlipTemplate(payroll);

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
  await browser.close();

  return pdfBuffer;
};