import { request, response } from 'express';
import pkg from 'bcryptjs';

import { generateJWT } from '../helpers/jwt.js';
import { modelUser } from '../models/user.js';

const { compareSync } = pkg;

export const login = async(req, res) => {

  const { email, password } = req.body;

  try {
    // Validate if email exists
    const user = await modelUser.findOne({ email });
    if(!user) {
      return res.status(400).json({
        msg: 'User / Password are not correct - email'
      });
    }
    // Validate if user is active
    if(!user.status) {
      return res.status(400).json({
        msg: 'User / Password are not correct - status: false'
      });
    }
    // Validate password
    const validPassword = compareSync(password, user.password);
    if(!validPassword) {
      return res.status(400).json({
        msg: 'User / Password are not correct - password'
      });
    }
    // Generate JWT
    const token = await generateJWT(user.id);
    res.json({
      user,
      token
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Talk to the admin'
    })  
  }
};