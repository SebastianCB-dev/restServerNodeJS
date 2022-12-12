import { request, response } from 'express';
import pkg from 'bcryptjs';

import { generateJWT } from '../helpers/jwt.js';
import { modelUser } from '../models/user.js';
import { googleVerify } from '../helpers/google-verify.js';

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

export const googleSignIn = async(req, res = response) => {
  const { id_token } = req.body;

  try {
    const { email, name, img } = await googleVerify(id_token);

    let user = await modelUser.findOne({ email });

    // If user does not exist
    if(!user) {
      // Create user
      const data = {
        name,
        email,
        password: 'By Google',
        img,
        role: "USER_ROLE",
        google: true
      };
      user = new modelUser(data);
      await user.save();
    }
    // If user is not active
    if(!user.status) {
      return res.status(401).json({
        msg: 'Talk to the admin, user blocked'
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    });
  }
  catch (error) {
    res.status(401).json({
      msg: 'Token is not valid',
    });
  }
}