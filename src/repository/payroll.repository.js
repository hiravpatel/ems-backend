import prisma from "../config/prisma.js";

// // Admin Process payroll
export const findPayrollByEmployeeAndMonthRepo = async (employeeId, month) => {
    return prisma.payroll.findUnique({
        where: { employeeId_month: {employeeId, month} }
    });
};
  
export const findEmployeeByIdRepo = async (id) => {
    return prisma.user.findUnique({
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
export const getPayrollByEmployeeRepo = async (payrollId) => {
    return prisma.payroll.findUnique({
        where: { id: payrollId },
        include: {
            employee: true,
        }
    });
};

// Get all payroll (user)
export const getMyPayrollsRepo = async (employeeId) => {
    return await prisma.payroll.findMany({
        where: {employeeId},
        orderBy: {createdAt: "desc"}
    });
};

// Get Salary slip by id
export const getPayrollByIdRepo = async (payrollId, employeeId) => {
    return prisma.payroll.findFirst({
        where: {
            id: payrollId,
            ...(employeeId ? { employeeId } : {})
        },
        include: {
            employee: true
        }
    });
}