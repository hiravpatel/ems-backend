import prisma from "../config/prisma.js";

export const findProfileByUserIdRepo = async (userId) => {
    return prisma.user.findUnique({
        where: {id: userId},
        include: {
            personalInfo: true,
            educationInfo: true
        }
    });
};

export const updateBasicInfoRepo = async (userId, data) => {
    return prisma.user.update({
        where: { id: userId },
        data
    });
}

export const upsertPersonalInfoRepo = async (userId, data) => {
    return prisma.personalInfo.upsert({
        where: { userId },
        update: data,
        create: { ...data, userId }
    });
};

export const upsertEducationInfoRepo = async (userId, data) => {
    return prisma.educationInfo.upsert({
        where: { userId },
        update: data,
        create: { ...data, userId }
    });
};