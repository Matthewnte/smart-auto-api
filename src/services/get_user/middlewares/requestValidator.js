// Require request validator
const { query } = require('express-validator');

const listUsers = [
  query('page')
    .default(1)
    .toInt(10)
    .isInt({ min: 1 })
    .withMessage('Page number must be a non-zero positive integer')
    .customSanitizer((val) => (val - 1)),
  query('limit')
    .default(100)
    .toInt(10)
    .isInt({ min: 100, max: 1000 })
    .withMessage('Page limit must be a positive integer between 100 and 1000 inclusive'),
  query('firstName')
    .optional()
    .isString()
    .withMessage('First name must be string')
    .trim(' ')
    .notEmpty()
    .withMessage('First name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('First name must be at least 3 characters'),
  query('lastName')
    .optional()
    .isString()
    .withMessage('Last name must be string')
    .trim(' ')
    .notEmpty()
    .withMessage('Last name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Last name must be at least 3 characters'),
  query('fullName')
    .optional()
    .isString()
    .withMessage('Full name must be string')
    .trim(' ')
    .notEmpty()
    .withMessage('Full name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Full name must be at least 3 characters'),
];

module.exports = {
  listUsers,
};
