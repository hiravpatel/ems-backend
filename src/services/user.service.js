import bcrypt from "bcryptjs";
import { createUserRepo, findUserByEmailRepo, getAllUserRepo, getUserByIdRepo, updateUserRepo, deleteUserRepo } from "../repository/user.repository.js"

// Create User
export const createUserService = async (data) => {
    const { firstName, lastName, email, contactNumber, joiningDate, password, role } = data;
    
    // Check if email exists
    const existingUser = await findUserByEmailRepo(email);
    
    if (existingUser) {
        const error = new Error("Email already exists");
        error.code = "EMAIL_EXISTS";
        throw error;
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare User Data
    const userData = {
        firstName,
        lastName,
        email,
        contactNumber,
        joiningDate: new Date(joiningDate),
        password: hashedPassword,
        role: "EMPLOYEE",
    };

    // Create User
    return createUserRepo(userData);
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
        error.code = "USER_NOT_FOUND"
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

    if(data.password) {
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