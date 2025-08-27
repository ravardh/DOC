import { body, validationResult } from 'express-validator';

export const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateFileUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  next();
};
