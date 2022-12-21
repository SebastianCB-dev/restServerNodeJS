import { Types } from 'mongoose';

import { User, Category, Product } from '../models/index.js';

const collectionsAllowed = [
  'categories',
  'products',
  'roles',
  'users'
];

const searchUsers = async (term = '', res) => {  
  const isMongoID = Types.ObjectId.isValid(term);
  if(isMongoID) {
    const user = await User.findById(term);
    return res.json({
      results: (user) ? [user] : []
    });
  }

  const regex = new RegExp(term, 'i');
  const users = await User.find({ 
    $or: [{name: regex}, {email: regex}],
    $and: [{status: true}]
  });

  return res.json({
    results: users
  });

}

const searchCategories = async (term = '', res) => {
  const isMongoID = Types.ObjectId.isValid(term);
  if(isMongoID) {
    const category = await Category.findById(term);
    return res.json({
      results: (category) ? [category] : []
    });
  }

  const regex = new RegExp(term, 'i');
  const categories = await Category.find({ name: regex, status: true });
  
  return res.json({
    results: categories
  });
}

const searchProducts = async (term = '', res) => {
  const isMongoID = Types.ObjectId.isValid(term);
  if (isMongoID) {
    const product = await Product.findById(term).populate('category', 'name');
    return res.json({
      results: (product) ? [product] : []
    });
  }

  const regex = new RegExp(term, 'i');
  const categories = await Product.find({ name: regex, status: true }).populate('category', 'name');
  return res.json({
    results: categories
  });
}

export const search = (req, res) => {

  const { collection, term } = req.params;

  if(!collectionsAllowed.includes(collection)) {
    return res.status(400).json({
      msg: `The collections allowed are: ${collectionsAllowed}`
    });
  }

  switch(collection) {
    case 'categories':
      searchCategories(term, res);
      break;
    case 'products':
      searchProducts(term, res);
      break;
    case 'roles':
      break;
    case 'users':
      searchUsers(term, res);
      break;
    default:
      res.status(500).json({
        msg: 'Please, contact the administrator'
      });
  }
}