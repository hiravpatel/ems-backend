import prisma from "../config/prisma.js";

// Create Leave Type
export const createLeaveTypeRepo = async (data) => {
    return prisma.leaveType.create({ data });
}

// Get all Leave Type
export const getAllLeaveTypeRepo = async () => {
    return prisma.leaveType.findMany();
}

// Get Leave Type by Id
export const getLeaveTypeByIdRepo = async (id) => {
    return prisma.leaveType.findFirst({
        where: {
            id: Number(id)
        }
    });
}

// Update Leave Type
export const updateLeaveTypeRepo = async (id, data) => {
    return prisma.leaveType.update({
        where: { id: Number(id) },
        data
    });
}

// Delete Leave Type
export const deleteLeaveTypeRepo = async (id) => {
    return prisma.leaveType.delete({
        where: { id: Number(id) }
    });
}
