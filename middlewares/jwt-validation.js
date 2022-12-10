import { response } from 'express';
import pkg from 'jsonwebtoken';
import { modelUser } from '../models/user.js';

const { verify } = pkg;

export const jwt_validation = async (req, res = response, next) => {
  const token = req.header('x-token');
  if(!token) {
    return res.status(401).json({
      msg: 'There is no token in the request'
    });
  }

  try {
    const { uid } = verify(token, process.env.SECRET_OR_PRIVATE_KEY);
    
    const user = await modelUser.findById(uid);

    if(!user) {
      return res.status(401).json({
        msg: 'Token is not valid - user does not exist in DB'
      });
    }

    if(!user.status) {
      return res.status(401).json({
        msg: 'Token is not valid - user status: false'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token is not valid'
    });
  }

}