import { Router } from 'express';
import { check } from 'express-validator';

import { middlewares } from '../middlewares/index.js';

import { createProduct, 
         getProducts, 
         getProduct,
         updateProduct,
         deleteProduct } from '../controllers/products.controller.js';
import { categoryExists, productExists } from '../helpers/db-validators.js';


export const routerProducts = Router();

// Get Products - public - pagination - populate
routerProducts.get('/', getProducts);

// Get Product by id - public - populate
routerProducts.get('/:id', [
  check('id', 'id is not valid').isMongoId(),
  check('id', 'Product does not exists').custom(productExists),
  middlewares.fieldsValidator
], getProduct);

// Create a new product - public - valid token
routerProducts.post('/', [
  middlewares.jwt_validation,
  check('name', 'name is required').not().isEmpty(),
  check('category', 'category id is required').isMongoId(),
  check('category', 'Category does not exists').custom(categoryExists),
  middlewares.fieldsValidator
], createProduct);

// Update a product - public - valid token
routerProducts.put('/:id', [
  middlewares.jwt_validation,
  check('id', 'id is not valid').isMongoId(),
  check('id', 'Product does not exists').custom(productExists),
  check('category', 'category id is required').isMongoId(),
  check('category', 'Category does not exists').custom(categoryExists),

  middlewares.fieldsValidator
], updateProduct);

// Delete a product - public - valid token
routerProducts.delete('/:id', [
  middlewares.jwt_validation,
  check('id', 'id is not valid').isMongoId(),
  check('id', 'Product does not exists').custom(productExists),
  middlewares.fieldsValidator
], deleteProduct);