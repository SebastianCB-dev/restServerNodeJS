import * as fieldsValidator from '../middlewares/fields-validator.js';
import * as jwt_validation from '../middlewares/jwt-validation.js';
import * as roles_validation from '../middlewares/role-validation.js';

export const middlewares = {
  ...fieldsValidator,
  ...jwt_validation,
  ...roles_validation
}