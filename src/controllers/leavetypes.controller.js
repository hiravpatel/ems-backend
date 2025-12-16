import { successResponse, errorResponse } from "../utils/response.js";
import { createLeaveTypeService, getAllLeaveTypeService, getLeaveTypeByIdService, updateLeaveTypeService, deleteLeaveTypeService } from "../services/leavetypes.service.js";

// Create LeaveType
export const createLeaveType = async (req, res) => {
    try {
        const leavetypes = await createLeaveTypeService(req.body);

        return successResponse(res, "Leave added successfully", leavetypes, 201);
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Server Error", 500, error.message);
    }
};

// Get All LeaveType
export const getAllLeaveType = async (req, res) => {
    try {
        const leaveTypes = await getAllLeaveTypeService();

        return successResponse(res, "Leaves Fetched Successfully", leaveTypes, 200);
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Server Error", 500, error.message);
    }
};

// Get LeaveType By Id
export const getLeaveTypeById = async (req, res) => {
    try {
        const { id } = req.params;
        const leaveType = await getLeaveTypeByIdService(Number(id));

        return successResponse(res, "LeaveType Fetched successfully", leaveType, 200);
    } catch (error) {
        
    }
}

// Update LeaveType
export const updateLeaveType = async (req, res) => {
    try {
        const { id } = req.params; //Extract Id

        const updatedLeaveType = await updateLeaveTypeService(Number(id), req.body);
        
        return successResponse(res, "Leave Type updated successfully", updatedLeaveType, 200);
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Server Error", 500, error.message);
    }
};

// Delete LeaveType
export const deleteLeaveType = async (req, res) => {
    try {
        const { id } = req.params; //Extract ID

        const deletedLeaveType = await deleteLeaveTypeService(Number(id));

        return successResponse(res, "Leave Type deleted successfully", deletedLeaveType, 200);
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Server Error", 500, error.message);
    }
};