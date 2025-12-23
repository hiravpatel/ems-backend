import bcrypt from "bcryptjs";
import {
  createUserRepo,
  findUserByEmailRepo,
  getAllUserRepo,
  getUserByIdRepo,
  updateUserRepo,
  deleteUserRepo,
  findDepartmentSalaryRepo
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

  // Get department salary
  const departmentSalary = await findDepartmentSalaryRepo(department);
  if (!departmentSalary) throw new Error(`Department salary not found for ${department}`);

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
    salary: departmentSalary.basicSalary,
    departmentSalaryId: departmentSalary.id,
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
export const getAllUserService = async (page, limit) => {
  const skip = (page - 1) * limit;

  const { users, totalCount } = await getAllUserRepo(skip, limit);
  
  return {
    employees: users,
    totalRecords: totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page
  };
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
  // Check if user exists
  const existingUser = await getUserByIdRepo(id);

  if (!existingUser) {
    const error = new Error("User not found");
    error.code = "USER_NOT_FOUND";
    throw error;
  }

  // Prepare updated data
  const updatedData = { ...data };

  // Convert joiningDate to Date if it exists
  if (data.joiningDate) {
    updatedData.joiningDate = new Date(data.joiningDate);
  }

  // Hash password if provided
  if (data.password) {
    updatedData.password = await bcrypt.hash(data.password, 10);
  }

  // Update user in DB
  try {
    const updatedUser = await updateUserRepo(id, updatedData);
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
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