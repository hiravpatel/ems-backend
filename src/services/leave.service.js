import { applyLeaveRepo, getUserLeavesRepo, getAllLeavesRepo, getLeaveByIdRepo, updateLeaveStatusRepo } from "../repository/leave.repository.js";

// Apply for Leave (Employee)
export const applyLeaveService = async (data) => {
    const { employeeId, leaveTypeId, fromDate, toDate, description } = data;

    if (!leaveTypeId || !fromDate || !toDate) {
        throw new Error("All fields are required");
    }

    // Prepare Leave
    const leaveData = {
        employeeId, 
        leaveTypeId, 
        fromDate: new Date(fromDate), 
        toDate: new Date(toDate), 
        description,
        status: "Pending"
    };

    // Stores Leave data in db
    return await applyLeaveRepo(leaveData);
};

// Get all Leaves(User)
export const getUserLeavesService = async (userId) => {
    return await getUserLeavesRepo(userId);
}

// Get all Leaves(Admin)
export const getAllLeavesService = async () => {
    return await getAllLeavesRepo();
}

// Get leave by id
export const getLeaveByIdService = async (id) => {
    return await getLeaveByIdRepo(id);
}

// Update leave status (Admin)
// Admin will approved/reject leave
export const updateLeaveStatusService =async (id, status) => {
    const allowedStatus = ["Pending", "Approved", "Rejected"];

    if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status");
    }

    return await updateLeaveStatusRepo(id, status);
}