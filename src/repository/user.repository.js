import prisma from "../config/prisma.js";

// Create user
export const findUserByEmail = async (email) => {
    return prisma.user.findUnique({ where: { email } });
};

export const createUserRepo = async (data) => {
    return prisma.user.create({ data });
};

export const findUserByEmailRepo = async (email) => {
    return prisma.user.findUnique({
        where: {email},
    });
};

// Get All Users
export const getAllUserRepo = async () => {
    return prisma.user.findMany();
}

// Get User by Id

export const getUserByIdRepo = async (id) => {
    return prisma.user.findUnique({
        where: { id },
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
export const deleteUserRepo = async (id) => {
    return prisma.user.delete({
        where: { id }
    });
}