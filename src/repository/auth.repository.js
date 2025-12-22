import prisma from "../config/prisma.js";

export const findUserByEmailRepo = async (email) => {
    return prisma.user.findUnique({
        where: {email},
    });
};

// Save OTP
export const saveOtpRepo = async (userId, otp, expiresAt) => {
    return prisma.userOtp.create({
        data: {
            userId,
            otp,
            status: "PENDING",
            expiresAt
        }
    });
};

// Verify OTP
export const verifyOtpRepo = async (userId, otp) => {
    return await prisma.userOtp.findFirst({
        where: {
            userId,
            otp,
            status: "PENDING",
            expiresAt: { gte: new Date() }
        },
        orderBy: { createdAt: "desc" }
    });
};

// Update OTP status
export const updateUserOtpStatusRepo = async (otpId, status) => {
    return await prisma.userOtp.update({
        where: { id: otpId },
        data: { status }
    });
};

export const updateUserPasswordRepo = async (userId, hashedPassword) => {
    return await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword, isFirstLogin: false }
    });
};