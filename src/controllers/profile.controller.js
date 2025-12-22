import {
  getMyProfileService,
  saveBasicInfoService,
  savePersonalInfoService,
  saveEducationInfoService,
} from "../services/profile.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const getMyProfile = async (req, res) => {
  try {
    const user = await getMyProfileService(req.user.id);

    return successResponse(res, "Profile fetched successfully", user, 200);
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Server Error", 500, error.message);
  }
};

export const saveBasicInfo = async (req, res) => {
  try {
    const data = await saveBasicInfoService(req.user.id, req.body);
    
    return successResponse(res, "Basic Info updated successfully", data, 200);
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Server Error", 500, error.message);
  }
};

export const savePersonalInfo = async (req, res) => {
  try {
    const info = await savePersonalInfoService(req.user.id, req.body);

    return successResponse(res, "Personal info saved successfully", info, 200);
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Server Error", 500, error.message);
  }
};

export const saveEducationInfo = async (req, res) => {
  try {
    const info = await saveEducationInfoService(req.user.id, req.body);

    return successResponse(res, "Education info saved successfully", info, 200);
  } catch (error) {
    console.log(error);
    return errorResponse(res, "Server Error", 500, error.message);
  }
};
