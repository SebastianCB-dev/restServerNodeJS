import { Router } from 'express';
import { check } from 'express-validator';

import { createCategory, 
         deleteCategoryByID, 
         getCategories, 
         getCategoryById, 
         updateCategoryByID} from '../controllers/categories.controller.js';

import { middlewares } from '../middlewares/index.js';
import { categoryExists } from '../helpers/db-validators.js';
import { jwt_validation } from '../middlewares/jwt-validation.js';

export const routerCategories = Router();

// Get all categories - public
routerCategories.get('/', getCategories);

// Get a category by id - public
routerCategories.get('/:id',[
  check('id', 'This is not a Mongo ID').isMongoId(),
  check('id').custom(categoryExists),
  middlewares.fieldsValidator
], getCategoryById);

// Create a new category - private - with a valid token
routerCategories.post('/', [
  middlewares.jwt_validation,
  check('name', 'name is required').not().isEmpty(),
  middlewares.fieldsValidator
  ], createCategory
);

// Update a category by id - private - with a valid token
routerCategories.put('/:id', [
  middlewares.jwt_validation,
  check('id', 'This is not a Mongo ID').isMongoId(),
  check('id').custom(categoryExists),
  check('name', 'name is required').not().isEmpty(),
  middlewares.fieldsValidator
], updateCategoryByID);

// Delete a category by id - private - ADMIN
// Only change the category's status to false
routerCategories.delete('/:id', [
  middlewares.jwt_validation,
  middlewares.isAdminRole,
  check('id').isMongoId(),
  check('id').custom(categoryExists),
  middlewares.fieldsValidator
], deleteCategoryByID);