import { validationResult } from "express-validator";


export const fieldsValidator = (req, res, next) => {
  // Errors from express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  
  next();
}