import { roleModel } from "../models/role.js";
import { modelUser } from "../models/user.js";

import { Category, Product } from '../models/index.js';

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

export const categoryExists = async (id = '') => {
  if(!id) {
    throw new Error('ID is required');
  }
  const category = await Category.findById(id)
                                 .where({status: true});
  if(!category) {
    throw new Error('Category does not exist');
  }
}


export const productExists = async (id = '') => {
  if (!id) {
    throw new Error('ID is required');
  }
  const product = await Product.findById(id)
    .where({ status: true });
  if (!product) {
    throw new Error('Product does not exist');
  }
}

export const allowedCollections = (collection = '', collections = []) => {
  const included = collections.includes(collection);
  if (!included) {
    throw new Error(`This collection is not allowed: ${collection}, allowed collections: ${collections}`);
  }
  return true;
}