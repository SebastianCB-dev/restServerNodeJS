import { Router } from 'express';
import { check } from 'express-validator';

// import { fieldsValidator } from '../middlewares/fields-validator.js';
// import { jwt_validation } from '../middlewares/jwt-validation.js';
// import { isAdminRole, hasRole } from '../middlewares/role-validation.js';

import { middlewares } from '../middlewares/index.js';
import { isEmailRegistered, isUserRegisteredByID, isValidRole } from '../helpers/db-validators.js';

import { usersDelete, 
         usersGet, 
         usersPatch, 
         usersPost, 
         usersPut } from '../controllers/user.controller.js';

export const routerUsers = Router();

// api/users
routerUsers.get('/', usersGet);

// router.put('/:id/:random?', usersPut);
routerUsers.put('/:id', [
  check('id', 'This is not a valid ID').isMongoId(),
  check('id').custom(isUserRegisteredByID),
  check('role').custom(isValidRole),
  middlewares.fieldsValidator
], usersPut);

routerUsers.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password is required and minimium 6 letters.').isLength({min: 6}),
  check('email').custom(isEmailRegistered),
  // check('role', 'This is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(isValidRole),
  middlewares.fieldsValidator
], usersPost);

routerUsers.delete('/:id', [
  middlewares.jwt_validation,
  // isAdminRole,
  middlewares.hasRole('ADMIN_ROLE', 'SALES_ROLE'),
  check('id', 'This is not a valid ID').isMongoId(),
  check('id').custom(isUserRegisteredByID),
  middlewares.fieldsValidator
], usersDelete);

routerUsers.patch('/', usersPatch);