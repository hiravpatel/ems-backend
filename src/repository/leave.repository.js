import prisma from "../config/prisma.js";

// Apply leave (Employee)
export const applyLeaveRepo = async (data) => {
    return await prisma.leave.create({ data });
}

// Get all Leaves (User)
export const getUserLeavesRepo = async (employeeId) => {
    return await prisma.leave.findMany({
        where: {employeeId},
        orderBy: { createdAt: "desc" },
        include: { leaveType: true }
    });
}

// Get all Leaves (Admin)
export const getAllLeavesRepo = async (skip, limit) => {
    const [ leaves, totalCount ] = await Promise.all([
        prisma.leave.findMany({
            include: {
                employee: true,
                leaveType: true
            },
            orderBy: {
                createdAt: "desc"
            },
            skip,
            take: limit
        }),

        prisma.leave.count()
    ]);
    return {leaves, totalCount};
}

// Get Leave by id (Admin)
export const getLeaveByIdRepo = async (id) => {
    return await prisma.leave.findUnique({
        where: { id: Number(id) },
        include: {
            employee: true,
            leaveType: true
        }
    });     
}

// Update Leave (Admin)
export const updateLeaveRepo = async (id, data) => {
    return await prisma.leave.update({
        where: {id: Number(id)},
        data: {
            ...data,
            fromDate: data.fromDate ? new Date(data.fromDate) : undefined,
            toDate: data.fromDate ? new Date(data.toDate) : undefined
        }
    });
}