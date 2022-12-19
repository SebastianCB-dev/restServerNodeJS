import { Router } from 'express';
import { check } from 'express-validator';

import { createCategory } from '../controllers/categories.controller.js';

import { middlewares } from '../middlewares/index.js';

export const routerCategories = Router();

// Get all categories - public
routerCategories.get('/', (req, res) => {
  res.json({
    msg: 'get API - categories',
  });
});

// Get a category by id - public
routerCategories.get('/:id',[
  check('id').custom(existsCategoryById),
] ,(req, res) => {
  res.json({
    msg: 'get API - categories with id',
  });
});

// Create a new category - private - with a valid token
routerCategories.post('/', [
  middlewares.jwt_validation,
  check('name', 'name is required').not().isEmpty(),
  middlewares.fieldsValidator
  ], createCategory
);

// Update a category by id - private - with a valid token
routerCategories.put('/:id', (req, res) => {
  res.json({
    msg: 'put API - categories',
  });
});

// Delete a category by id - private - ADMIN
// Only change the category's status to false
routerCategories.delete('/:id', (req, res) => {
  res.json({
    msg: 'delete API - categories',
  });
});