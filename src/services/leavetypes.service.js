import {
  createLeaveTypeRepo,
  getLeaveTypeByIdRepo,
  getAllLeaveTypeRepo,
  updateLeaveTypeRepo,
  deleteLeaveTypeRepo,
} from "../repository/leavetypes.repository.js";

// Create LeaveType
export const createLeaveTypeService = async (data) => {
  const { leaveType, description } = data;

  if (!leaveType) {
    throw new Error("Leave type is required");
  }

  // Prepare Leave Type Data
  const leaveTypeData = {
    leaveType,
    description,
  };

  // Create Leave in db
  return await createLeaveTypeRepo(leaveTypeData);
};

// Get All LeaveType
export const getAllLeaveTypeService = async () => {
  return await getAllLeaveTypeRepo();
};

// Get LeaveType By Id
export const getLeaveTypeByIdService = async (id) => {
  const leaveType = await getLeaveTypeByIdRepo(id);

  if (!leaveType) {
    const error = new Error("Leave Type not found");
    error.code = "LEAVE_TYPE_NOT_FOUND";
    throw error;
  }

  return leaveType;
};

// Update LeaveType
export const updateLeaveTypeService = async (id, data) => {
  // Check user is available or not
  const existingLeave = await getLeaveTypeByIdRepo(id);

  if (!existingLeave) {
    const error = new Error("Leave not found");
    error.code = "LEAVE_NOT_FOUND";
    throw error;
  }

  let updatedLeaveData = data;

  return await updateLeaveTypeRepo(id, updatedLeaveData);
};

// Delete LeaveType
export const deleteLeaveTypeService = async (id) => {
  const leave = await getLeaveTypeByIdRepo(id);

  if (!leave) {
    const error = new Error("Leave not found");
    error.code = "LEAVE_NOT_FOUND";
    throw error;
  }

  return await deleteLeaveTypeRepo(id);
};
