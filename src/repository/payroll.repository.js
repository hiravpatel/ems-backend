import prisma from "../config/prisma.js";

// // Admin Process payroll
export const findPayrollByEmployeeAndMonthRepo = async (employeeId, month) => {
    return prisma.payroll.findUnique({
        where: { employeeId_month: {employeeId, month} }
    });
};
  
export const findEmployeeByIdRepo = async (id) => {
    return prisma.payroll.findUnique({
        where: {id},
        include: { departmentSalary: true }
    });
};

export const createPayrollRepo = async (data) => {
    return prisma.payroll.create({ data });
};

// Get all payrolls
export const getAllPayrollsRepo = async () => {
    return prisma.payroll.findMany({
        include: { employee: true },
        orderBy: { createdAt: "desc" }
    });
};

// Get Payroll by employee
export const getPayrollByEmployeeRepo = async (employeeId) => {
    return prisma.payroll.findMany({
        where: { employeeId },
        include: { employee: true },
        orderBy: { createdAt: "desc" }
    });
};