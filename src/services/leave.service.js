import {
  applyLeaveRepo,
  getUserLeavesRepo,
  getAllLeavesRepo,
  getLeaveByIdRepo,
  updateLeaveRepo,
} from "../repository/leave.repository.js";

// Apply for Leave (Employee)
export const applyLeaveService = async (data) => {
  const { employeeId, leaveTypeId, fromDate, toDate, description } = data;

  if (!leaveTypeId || !fromDate || !toDate) {
    throw new Error("All fields are required");
  }

  // Prepare Leave
  const leaveData = {
    employeeId,
    leaveTypeId: Number(leaveTypeId),
    fromDate: new Date(fromDate),
    toDate: new Date(toDate),
    description,
    status: "Pending",
  };

  // Stores Leave data in db
  return await applyLeaveRepo(leaveData);
};

// Get all Leaves(User)
export const getUserLeavesService = async (userId) => {
  return await getUserLeavesRepo(userId);
};

// Get all Leaves(Admin)
export const getAllLeavesService = async (page, limit) => {
  const skip = (page - 1) * limit;

  const { leaves, totalCount } = await getAllLeavesRepo(skip, limit);
  
  return {
    leaves,
    totalRecords: totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page
  };
};

// Get leave by id
export const getLeaveByIdService = async (id) => {
  return await getLeaveByIdRepo(id);
};

// Update leave (Admin)
export const updateLeaveService = async (id, data) => {
  const { status, leaveTypeId, fromDate, toDate, description } = data;

  const allowedStatus = ["Pending", "Approved", "Rejected"];

  if (status && !allowedStatus.includes(status)) {
    throw new Error("Invalid status");
  }

  return await updateLeaveRepo(id, data);
};
