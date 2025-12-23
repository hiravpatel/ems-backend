import prisma from "../config/prisma.js";

export const findUserByEmailRepo = async (email) => {
    return prisma.user.findUnique({
        where: {email},
    });
};

// Create user
export const createUserRepo = async (data) => {
    return prisma.user.create({ data });
};

// Get All Users
export const getAllUserRepo = async (skip, limit) => {
    const [ users, totalCount ] = await Promise.all([
        prisma.user.findMany({
            where: {
                role: "EMPLOYEE",
            },
            skip,
            take: limit,
            orderBy: { id: "desc"}
        }),

        prisma.user.count({
            where: {
                role: "EMPLOYEE"
            }
        })
    ]);

    return {users, totalCount};
}

// Get User by Id
export const getUserByIdRepo = async (id) => {
    return prisma.user.findFirst({
        where: {id},
        include: {
            personalInfo: true,
            educationInfo: true
        }
    });
}

// Update User
export const updateUserRepo = async (id, data) => {
    return prisma.user.update({
        where: { id },
        data
    });
}

// Delete User
// This logic is for users Soft Delete
export const deleteUserRepo = async (id) => {
    return prisma.user.update({
        where: { id: id },
        data: {
            deletedAt: new Date(),
            status: "Inactive"
        }
    });
}

export const findDepartmentSalaryRepo = async (department) => {
    return prisma.departmentSalary.findUnique({ where: { department } });
}