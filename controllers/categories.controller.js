
import { Category } from "../models/index.js";

// get all categories - paginated - total - populate

// get a category by id - populate {}

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

// delete a category by id - change status to false