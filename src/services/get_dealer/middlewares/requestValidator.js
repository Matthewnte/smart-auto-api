// Require request validator
const { query } = require('express-validator');

const listDealers = [
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
  query('name')
    .optional()
    .isString()
    .withMessage('Name must be string')
    .trim(' ')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters'),
  query('location')
    .optional()
    .isString()
    .withMessage('Location must be string')
    .trim(' ')
    .notEmpty()
    .withMessage('Location cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Location must be at least 3 characters'),
];

module.exports = {
  listDealers,
};
