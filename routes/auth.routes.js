import { Router } from 'express';
import { check } from 'express-validator';

import { googleSignIn, login } from '../controllers/auth.controller.js';
import { fieldsValidator } from '../middlewares/fields-validator.js';

export const routerAuth = Router();

// api/auth
routerAuth.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  fieldsValidator
], login);

routerAuth.post('/google', [
  check('id_token', 'id_token is required').not().isEmpty(),
  fieldsValidator
], googleSignIn);