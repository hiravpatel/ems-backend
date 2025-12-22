import prisma from "../config/prisma.js";

export const getTotalEmployeesRepo = async () => {
    return prisma.user.count();
}

export const getActiveEmployeesRepo = async () => {
    return prisma.user.count({
        where: { status: "Active" }
    });
}

export const getDepartmentsRepo = async () => {
    return prisma.departmentSalary.count();
}

export const getThisMonthPayrollRepo = async (year, month) => {
    const monthStr = month.toString().padStart(2, "0");

    return prisma.payroll.aggregate({
        _sum: { netSalary: true },
        where: {
            month: `${year} - ${monthStr}`
        }
    });
}