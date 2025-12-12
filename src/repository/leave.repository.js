import prisma from "../config/prisma.js";

// Apply leave (Employee)
export const applyLeaveRepo = async (data) => {
    return prisma.leave.create({ data });
}

// Get all Leaves (Admin)
export const getAllLeavesRepo = async () => {
    return prisma.leave.findMany();
}

// Update Leave Type (Admin)
export const updateLeaveStatusRepo = async (id, status) => {
    return prisma.leave.update({
        where: {id: Number(id)},
        data: { status }
    });
}