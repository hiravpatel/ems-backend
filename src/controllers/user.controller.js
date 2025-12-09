import { createUserService, getAllUserService, getUserByIdService, updateUserService, deleteUserService  } from "../services/user.service.js"
import { successResponse, errorResponse } from "../utils/response.js";
// Create User 
export const createUser = async (req, res) => {
    try {
        const user = await createUserService(req.body);

        return successResponse(res, "User created successfully", user, 201);

    } catch (error) {

        if (error.code === "EMAIL_EXISTS") {
            return errorResponse(res,"Email already exists", 400)
        }

        console.log(error);
        return errorResponse(res, "Server Error", 500, error.message);
    }
};

// Get all User
export const getAllUser = async (req, res) => {
    try {
        const users = await getAllUserService();

        return successResponse(res, "Users fetched successfully", users, 200);

    } catch (error) {
        console.log(error);
        return errorResponse(res, "Server Error", 500, error.message);
    }
};

// Get User by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService(Number(id));

        return successResponse(res, "User fetched successfully", user, 200)

    } catch (error) {
        console.log(error);
        return errorResponse(res, "Server Error", 500, error.message);
    }
};

// Update User
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params; //Extract Id
        
        const updatedUser = await updateUserService(Number(id), req.body);

        return successResponse(res, "User updated successfully", updatedUser, 200);

    } catch (error) {
        if (error.code === "USER_NOT_FOUND") {
            return errorResponse(res, "User not found", 404);
        }

        console.log(error);
        return errorResponse(res, "Server Error", 500, error.message);
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; //Extract Id

        const deletedUser = await deleteUserService(Number(id));

        return successResponse(res, "User deleted successfully", deletedUser, 200);
    } catch (error) {
        if (error.code === "USER_NOT_FOUND") {
            return errorResponse(res, "User not found", 404);
        }

        console.log(error);
        return errorResponse(res, "Server Error", 500, error.message)
    }
};