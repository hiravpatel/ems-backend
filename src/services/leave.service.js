import { applyLeaveRepo, getAllLeavesRepo, updateLeaveStatusRepo } from "../repository/leave.repository.js";

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
        description
    };

    // Stores Leave data in db
    return await applyLeaveRepo(leaveData);
};

// Get all Leaves
export const getAllLeavesService = async () => {
    return await getAllLeavesRepo();
}

// Update leave status (Admin)
// Admin will approved/reject leave
export const updateLeaveStatusService =async (id, status) => {
    const allowedStatus = ["Approved","Rejected"];

    if (!allowedStatus.includes(status)) {
        throw new Error("Invalid status");
    }

    return await updateLeaveStatusRepo(id, status);
}