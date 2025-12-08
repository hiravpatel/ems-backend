import prisma from "../src/config/prisma.js";

export const findUserByEmail = async (email) => {
    return prisma.user.findUnique({ where: { email } });
};
