
import { Category } from "../models/index.js";

// get all categories - paginated - total - populate
export const getCategories = async(req, res) => {

  const { limit = 5, from = 0 } = req.query; 

  const [total, categories] = await Promise.all([
    Category.countDocuments({status: true}),
    Category.find({status: true}).limit(Number(limit))
                                 .skip(Number(from))
                                 .populate('user', 'name')
  ]);

  res.json({
    total,
    categories
  });
}

// get a category by id - populate {}
export const getCategoryById = async(req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id)
                                 .where({status: true})
                                 .populate('user', 'name');
  res.json({
    category
  });
}

export const createCategory = async(req, res) => {
  const name = req.body.name.toUpperCase();
  const existsCategory = await Category.findOne({name});
  if(existsCategory){
    return res.status(400).json({
      msg: `Category ${existsCategory.name} already exists`
    });
  }

  const data = {
    name,
    user: req.user._id
  };
  const category = await new Category(data);
  await category.save();

  res.status(201).json(category);
}

// update a category by id
export const updateCategoryByID = async(req, res) => {
  const { name } = req.body; 
  const nameUpper = name.toUpperCase();
  const user = req.user._id; 
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, {name: nameUpper, user},
                                                        {new: true});
  res.json(
    category
  );
}
// delete a category by id - change status to false

export const deleteCategoryByID = async(req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, {status: false}, {new: true});
  res.json({
    category
  });
}