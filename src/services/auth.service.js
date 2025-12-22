import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  findUserByEmailRepo,
  saveOtpRepo,
  verifyOtpRepo,
  updateUserOtpStatusRepo,
  updateUserPasswordRepo
} from "../repository/auth.repository.js";
import prisma from "../config/prisma.js";
import { getEmailTemplate } from "../utils/verifiedOtpEmailTemplate.js";
import { sendEmail } from "../utils/sendEmail.js";

// Login
export const loginService = async (email, password) => {
  const user = await findUserByEmailRepo(email);
  if (!user) return { status: false, message: "Invalid email or password" };

  // First - time login
  if (user.role === "EMPLOYEE" && user.isFirstLogin) {
    const isOtpValid = await bcrypt.compare(password, user.password); // Compare OTP

    if (!isOtpValid) {
      return { status: false, message: "Invalid OTP" };
    }

    // OTP correct -> mark first login done
    await updateUserPasswordRepo(user.id, user.password);

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

// Send OTP
export const sendOtpService = async (email) => {
  const user = await findUserByEmailRepo(email);
  if (!user) throw new Error("User not found");

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //10 min expiry

  await saveOtpRepo(user.id, otp, expiresAt);

  const html = getEmailTemplate(user.firstName, otp);
  await sendEmail(email, "Your OTP for Password Reset", html);

  return true;
};

// Verify OTP
export const verifyOtpService = async (email, otp) => {
  const user = await findUserByEmailRepo(email);
  if(!user) throw new Error("User not found");
  
  const userOtp = await verifyOtpRepo(user.id, otp);
  if (!userOtp) throw new Error("Invalid or expired OTP");

  await updateUserOtpStatusRepo(userOtp.id, "VERIFIED");

  return true;
};

// Change Password
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
  const updatePassword = await updateUserPasswordRepo(userId, hashedPassword);

  return updatePassword;
};
