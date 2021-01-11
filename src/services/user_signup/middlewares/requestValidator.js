// Require request validator
const { body } = require('express-validator');

const signup = [
  body('email')
    .trim(' ')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Not a valid email')
    .normalizeEmail({ all_lowercase: true }),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .trim(' ')
    .notEmpty()
    .withMessage('Password is required')
    .isStrongPassword({
      minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0,
    })
    .withMessage('Use a strong password')
    .custom((password, { req }) => password === req.body.confirmPassword)
    .withMessage('Passwords must match')
    .escape(),
  body('firstName')
    .isString()
    .withMessage('First name must be string')
    .trim(' ')
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters')
    .escape(),
  body('lastName')
    .isString()
    .withMessage('Last name must be string')
    .trim(' ')
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters')
    .escape(),
];

module.exports = {
  signup,
};
