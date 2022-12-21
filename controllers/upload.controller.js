
import { response } from "express";
import path from 'path';
import fs from 'fs';
import { uploadFile } from '../helpers/upload-file.js';
import cloudinary from 'cloudinary';

const { config, uploader } = cloudinary.v2;

config({ api_key: 586332471125753, 
  api_secret: "G0yUmOBMKL1FtOlD5aG0J91-Lp4",
  cloud_name: "dd3xzhgee"});

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { User, Product } from '../models/index.js';

export const uploadFileController = async(req, res = response) => {

  // Images
  try {
    // const name = await uploadFile(req.files, ['txt', 'md'], 'texts');
    const name = await uploadFile(req.files, undefined, 'imgs');
    res.json({ name });
  }
  catch(err) {
    res.status(400).json({ msg: err });
  }
}

export const updateImageController = async(req, res = response) => {

  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is no user with id: ${id}`
        });
      }
      
      break;
    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is no product with id: ${id}`
        });
      }

      break;
    default:
      return res.status(500).json({
        msg: 'This collection is not allowed contact the administrator'
      });

    }

  // Clean previous images
  if(model.image) {
    // Delete image from server
    const pathImage = path.join(__dirname, '../uploads', collection, model.image);
    if(fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }


  try {
    model.image = await uploadFile(req.files, undefined, collection);
    await model.save();
    res.json({collection, id})
  }
  catch(err) {
    res.status(400).json({ msg: err });
  }

}

export const showImage = async(req, res = response) => {

  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is no user with id: ${id}`
        });
      }

      break;
    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is no product with id: ${id}`
        });
      }

      break;
    default:
      return res.status(500).json({
        msg: 'This collection is not allowed contact the administrator'
      });

  }

  // Clean previous images
  if (model.image) {
    const pathImage = path.join(__dirname, '../uploads', collection, model.image);
    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }
  }
  const pathImageDefault = path.join(__dirname, '../assets/no-image.jpg');
  res.sendFile(pathImageDefault);

}




export const updateImageCloudinaryController = async (req, res = response) => {

  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is no user with id: ${id}`
        });
      }

      break;
    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is no product with id: ${id}`
        });
      }

      break;
    default:
      return res.status(500).json({
        msg: 'This collection is not allowed contact the administrator'
      });

  }

  // Clean previous images
  if (model.image) {
    const nameArr = model.image.split('/');
    const name = nameArr[nameArr.length - 1];
    const [public_id] = name.split('.');
    uploader.destroy(public_id);    
  }
  
  const { tempFilePath } = req.files.file;
  try {
    const { secure_url } = await uploader.upload( tempFilePath );
    model.image = secure_url;
    res.json({model});
  }
  catch(err) {
    res.status(400).json({ msg: err });
  }
  // try {
  //   model.image = await uploadFile(req.files, undefined, collection);
  //   await model.save();
  //   res.json({ collection, id })
  // }
  // catch (err) {
  //   res.status(400).json({ msg: err });
  // }

}