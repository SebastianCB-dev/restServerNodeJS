import { Router } from 'express';
import { check } from 'express-validator';

import { fieldsValidator } from '../middlewares/fields-validator.js';
import { isEmailRegistered, isUserRegisteredByID, isValidRole } from '../helpers/db-validators.js';

import { usersDelete, 
         usersGet, 
         usersPatch, 
         usersPost, 
         usersPut } from '../controllers/user.controller.js';

export const router = Router();

// api/users
router.get('/', usersGet);

// router.put('/:id/:random?', usersPut);
router.put('/:id', [
  check('id', 'This is not a valid ID').isMongoId(),
  check('id').custom(isUserRegisteredByID),
  check('role').custom(isValidRole),
  fieldsValidator
], usersPut);

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password is required and minimium 6 letters.').isLength({min: 6}),
  check('email').custom(isEmailRegistered),
  // check('role', 'This is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(isValidRole),
  fieldsValidator
], usersPost);

router.delete('/:id', [
  check('id', 'This is not a valid ID').isMongoId(),
  check('id').custom(isUserRegisteredByID),
  fieldsValidator
], usersDelete);

router.patch('/', usersPatch);