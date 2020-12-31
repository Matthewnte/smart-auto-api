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
  body('companyName')
    .isString()
    .withMessage('Company name must be string')
    .trim(' ')
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ min: 5 })
    .withMessage('Company name must be at least 5 characters')
    .escape(),
  body('address')
    .isString()
    .withMessage('Address must be string')
    .trim(' ')
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ min: 20 })
    .withMessage('Address must be at least 20 characters')
    .escape(),
  body('phone')
    .trim(' ')
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone('en-NG', { strictMode: true })
    .withMessage('Not a valid email'),
];

module.exports = {
  signup,
};
