import { roleModel } from "../models/role.js";
import { modelUser } from "../models/user.js";

export const isValidRole = async(role = '') => {
  const isExists = await roleModel.findOne({role});
  if(!isExists) {
    throw new Error(`This role does not exist: ${role}`);
  }
}

export const isEmailRegistered = async(email = '') => {
  const isEmailRegistered = await modelUser.findOne({ email });
  if (isEmailRegistered) {
    throw new Error('This email is currently registered.');  
  }
}

export const isUserRegisteredByID = async (id = '') => {
  const isUserExist = await modelUser.findById(id);
  if (!isUserExist) {
    throw new Error('This user does not exist.');    
  }
}