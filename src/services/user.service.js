import bcrypt from "bcryptjs";
import {
  createUserRepo,
  findUserByEmailRepo,
  getAllUserRepo,
  getUserByIdRepo,
  updateUserRepo,
  deleteUserRepo
} from "../repository/user.repository.js";
import { generateEmployeeCode } from "../utils/generateEmployeeCode.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendEmail } from "../utils/sendEmail.js";
import { getEmailTemplate } from "../utils/emailTemplate.js";

// Create User
export const createUserService = async (data) => {
  const {
    firstName,
    lastName,
    email,
    contactNumber,
    joiningDate,
    role = "EMPLOYEE",
    position,
    department,
    status = "Active",
  } = data;

  // Check if email exists
  const existingUser = await findUserByEmailRepo(email);

  if (existingUser) {
    const error = new Error("Email already exists");
    error.code = "EMAIL_EXISTS";
    throw error;
  }

  // Generate One-Time Password
  const otp = generateOtp(6); //Plain Password generator

  // Hash Password
  // Store One-Time Password
  const hashedPassword = await bcrypt.hash(otp, 10);

  // Generate Employee Code only for Employee role
  let employeeCode = null;
  if (role === "EMPLOYEE") {
    employeeCode = await generateEmployeeCode();
  }

  // Prepare User Data
  const userData = {
    firstName,
    lastName,
    email,
    contactNumber,
    joiningDate: new Date(joiningDate),
    password: hashedPassword,
    role,
    position,
    department,
    status,
    employeeCode,
  };

  // Create User in db
  const createdUser = await createUserRepo(userData);

  // Prepare HTML email
  const htmlContent = getEmailTemplate(firstName, otp);

  // Send email
  await sendEmail(email, "Your One-Time Password", htmlContent);

  return {
    user: createdUser,
    otp,
    message: "User created & OTP sent to email",
  };
};

// Get all Users
export const getAllUserService = async () => {
  return getAllUserRepo();
};

// Get User by ID
export const getUserByIdService = async (id) => {
  const user = await getUserByIdRepo(id);

  if (!user) {
    const error = new Error("User not found");
    error.code = "USER_NOT_FOUND";
    throw error;
  }

  return user;
};

// Update User
export const updateUserService = async (id, data) => {
  // Check user is available or not
  const existingUser = await getUserByIdRepo(id);

  if (!existingUser) {
    const error = new Error("User not found");
    error.code = "USER_NOT_FOUND";
    throw error;
  }

  // Hash the password
  let updatedData = { ...data };

  if (data.password) {
    updatedData.password = await bcrypt.hash(data.password, 10);
  }

  // Return Updated User
  return await updateUserRepo(id, updatedData);
};

// Delete User
export const deleteUserService = async (id) => {
  const user = await getUserByIdRepo(id);

  if (!user) {
    const error = new Error("User not found");
    error.code = "USER_NOT_FOUND";
    throw error;
  }

  // Return Delete
  return deleteUserRepo(id);
};