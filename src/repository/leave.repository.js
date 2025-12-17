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
export const getAllLeavesRepo = async () => {
    return await prisma.leave.findMany({
        include: {
            employee: true,
            leaveType: true
        },
        orderBy: {
            createdAt: "desc" 
        }
    });
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

// Update Leave Type (Admin)
export const updateLeaveStatusRepo = async (id, status) => {
    return await prisma.leave.update({
        where: {id: Number(id)},
        data: { status }
    });
}