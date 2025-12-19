import prisma from "../config/prisma.js";

export const findUserByEmailRepo = async (email) => {
    return prisma.user.findUnique({
        where: {email},
    });
};

export const saveOtpRepo = async (email, otp, expiresAt) => {
    return prisma.user.update({
        where: { email },
        data: { otp, otpExpiresAt: expiresAt }
    });
}

export const verifyOtpRepo = async (email, otp) => {
    const user = await prisma.user.findUnique({ where: {email} });
    if (!user) return null;
    if (user.otp !== otp) return null;
    if (user.otpExpiresAt < new Date()) return null;
    return user;
}

// Create user
export const createUserRepo = async (data) => {
    return prisma.user.create({ data });
};

// Get All Users
export const getAllUserRepo = async () => {
    return prisma.user.findMany({
        where: {  role: "EMPLOYEE" } 
    });
}

// Get User by Id
export const getUserByIdRepo = async (id) => {
    return prisma.user.findFirst({
        where: {
            id: Number(id),
            deletedAt: null
        },
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
        where: { id: Number(id) },
        data: {
            deletedAt: new Date(),
            status: "Inactive"
        }
    });
}

export const findDepartmentSalaryRepo = async (department) => {
    return prisma.departmentSalary.findUnique({ where: { department } });
}