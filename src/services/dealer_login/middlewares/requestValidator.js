// Require request validator
const { body } = require('express-validator');

const login = [
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
    .escape(),
];

module.exports = {
  login,
};
