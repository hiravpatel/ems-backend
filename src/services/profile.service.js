import {
  findProfileByUserIdRepo,
  updateBasicInfoRepo,
  upsertPersonalInfoRepo,
  upsertEducationInfoRepo,
} from "../repository/profile.repository.js";

export const getMyProfileService = async (userId) => {
  return await findProfileByUserIdRepo(userId);
};

export const saveBasicInfoService = async (userId, data) => {
  const basicData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    contactNumber: data.contactNumber
  };

  return await updateBasicInfoRepo(userId, basicData);
};

export const savePersonalInfoService = async (userId, data) => {
  const personalInfoData = {
    fatherName: data.fatherName,
    fatherContact: data.fatherContact,
    motherName: data.motherName,
    motherContact: data.motherContact,
    address: data.address,
    dateOfBirth: data.dateOfBirth
      ? new Date(data.dateOfBirth)
      : null,
  };  
  
  return await upsertPersonalInfoRepo(userId, personalInfoData);
};

export const saveEducationInfoService = async (userId, data) => {
  return await upsertEducationInfoRepo(userId, data);
};
