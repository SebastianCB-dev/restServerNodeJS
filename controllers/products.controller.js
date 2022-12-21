
import { Product } from '../models/index.js';

// Get all products
export const getProducts = async(req, res) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, products] = await Promise.all([
    Product.find().where(query)
                  .countDocuments(),
    Product.find().where(query)
                  .limit(Number(limit))
                  .skip(Number(from))
                  .populate('user', 'name')
                  .populate('category', 'name')
  ]);

  return res.json({
    total,
    products
  });
}

// Get Product 
export const getProduct = async(req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({ _id: id, status: true })
                               .populate('user', 'name')
                               .populate('category', 'name');

  return res.json(product);

}

// Post create a product
export const createProduct = async(req, res) => {
  const { name, category, prize, description, available } = req.body;
  const user = req.user._id;
  const nameUpper = name.toUpperCase();
  const existsProduct = await Product.findOne({name: nameUpper});
  if(existsProduct){
    return res.status(400).json({
      msg: `Product ${existsProduct.name} already exists`
    });
  }
  const newProduct = await new Product({ name: nameUpper, category, prize, description, available, user });

  await newProduct.save();

  return res.status(201).json(newProduct);
}

// Update a product
export const updateProduct = async(req, res) => {
  const { id } = req.params; 
  const { name, prize, available, description, category } = req.body;
  const user = req.user._id;
  let nameUpper = '';
  if(name){
    nameUpper = name.toUpperCase();
  }
  const product = await Product.findByIdAndUpdate(id, { name: nameUpper, prize, available, description, user, category }, { new: true });

  return res.json(product);

}

// Delete a product
export const deleteProduct = async(req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

  return res.json(product);
}