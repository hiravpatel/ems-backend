import { successResponse, errorResponse } from "../utils/response.js";
import { applyLeaveService, getUserLeavesService, getAllLeavesService, getLeaveByIdService, updateLeaveStatusService } from "../services/leave.service.js"

// Apply for Leave (Employee)
export const applyLeave = async (req, res) => {
    try {
        const employeeId = req.user.id;//from verifyUser middleware
        
        const leave = await applyLeaveService({
            employeeId, 
            ...req.body
        });

        return successResponse(res, "Leave applied successfully", leave, 201);
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Error applying leave", 500, error.message);
    }
};

// Get all Leaves(User)
// User will get all Leaves
export const getUserLeaves = async (req, res) => {
    try {
        const userId = req.user.id;
        const userLeave = await getUserLeavesService(userId);
        
        return successResponse(res, "User Leaves fetched successfully", userLeave, 200)
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Server Error", 500, error.message);
    }
}

// Get all Leaves(Admin)
// Admin will get all Leaves
export const getAllLeaves = async (req, res) => {
    try {
        const leaves = await getAllLeavesService();

        return successResponse(res, "Leaves fetched successfully", leaves, 200);
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Server Error", 500, error.message);
    }
};

// Get leave by id
export const getLeaveById = async (req, res) => {
    try {
        const { id } = req.params;

        const leave = await getLeaveByIdService(id);

        return successResponse(res, "Leaves Details fetched successfully", leave, 200);
    } catch (error) {
        return errorResponse(res, "Server Error", 500, error.message);
    }
}

// Update leave status (Admin)
// Admin will approved/reject leave
export const updateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params; //Extract Id
        const { status } = req.body;

        const updatedLeave = await updateLeaveStatusService(Number(id), status);

        return successResponse(res, "Leave Status updated successfully", updatedLeave, 200);
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Server Error", 500, error.message);
    }
};