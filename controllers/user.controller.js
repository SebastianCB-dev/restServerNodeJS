import { response, request } from 'express';
import { modelUser } from '../models/user.js';
import bcrypt from 'bcryptjs';

const { genSaltSync, hashSync } = bcrypt;

export const usersGet = async(req = request, res = response) => {  
  const { limit = 5, from = 0 } = req.query;
  const query = {status: true}; 

  const [total, users] = await Promise.all([
    modelUser.countDocuments(query),
    modelUser.find(query)
      .skip(Number(from))
      .limit(Number(limit))
  ]);

  res.json({
    total,
    users
  });
}

export const usersPost = async(req, res = response) => {
  
  const { name, email, password, role } = req.body;
  const user = new modelUser({ name, email, password, role});
  // Crypt password
  const salt = genSaltSync(12);
  user.password = hashSync(password, salt);
  await user.save();
  res.json({
    msg: 'Post API - controller',
    user
  });
}

export const usersPut = async(req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;
  
  if(password) {
    const salt = genSaltSync(12);
    rest.password = hashSync(password, salt);
  }

  const userUpdated = await modelUser.findByIdAndUpdate(id, rest, {new: true});

  res.json(userUpdated);
}

export const usersDelete = async(req, res = response) => {
  const { id } = req.params;
  
  const userDeleted = await modelUser.findByIdAndUpdate(id, {status: false},
                                                            {new: true});

  res.json({
    userDeleted,
  });
}

export const usersPatch = (req, res = response) => {
  res.json({
    msg: 'Patch API - controller'
  });
}