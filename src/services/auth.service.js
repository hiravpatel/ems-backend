import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  findUserByEmailRepo,
  saveOtpRepo,
  verifyOtpRepo,
} from "../repository/user.repository.js";
import prisma from "../config/prisma.js";
import { getEmailTemplate } from "../utils/emailTemplate.js";
import { sendEmail } from "../utils/sendEmail.js";

export const loginService = async (email, password) => {
  const user = await findUserByEmailRepo(email);
  if (!user) return { status: false, message: "Invalid email or password" };

  if (user.role === "EMPLOYEE" && user.isFirstLogin) {
    // Compare OTP
    const isOtpValid = await bcrypt.compare(password, user.password);

    if (!isOtpValid) {
      return { status: false, message: "Invalid OTP" };
    }

    // OTP correct -> mark first login done
    await prisma.user.update({
      where: { id: user.id },
      data: { isFirstLogin: false },
    });

    // Return response asking user to change password
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return {
      status: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        employeeCode: user.employeeCode,
        email: user.email,
        role: user.role,
      },
    };
  } else {
    // Normal login with password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return { status: false, message: "Invalid email or password" };

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return {
      status: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        employeeCode: user.employeeCode,
        email: user.email,
        role: user.role,
      },
    };
  }
};

export const sendOtpService = async (email) => {
  const user = await findUserByEmailRepo(email);
  if (!user) throw new Error("User not found");

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //10 min expiry

  await saveOtpRepo(email, otp, expiresAt);

  const html = getEmailTemplate(user.firstName, otp);
  await sendEmail(email, "Your OTP for Password Reset", html);

  return true;
};

export const verifyOtpService = async (email, otp) => {
  const user = await verifyOtpRepo(email, otp);
  if (!user) throw new Error("Invalid or expired OTP");
  return true;
};

export const changePasswordService = async (
  userId,
  newPassword,
  confirmPassword
) => {
  // Check password match
  if (newPassword !== confirmPassword) {
    throw new Error("Password do not match");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword, isFirstLogin: false },
  });

  return true;
};
