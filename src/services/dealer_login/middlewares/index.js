const { validationResult } = require('express-validator');
const validators = require('./requestValidator');

module.exports = {
  /**
   * Check to ensure there's nothing wrong with usable user input
   * @param {object} req Expres request object
   * @param {object} res  Expres request object
   * @param {object} next  Expres request object
   */
  isRequestValid: async (req, res, next) => {
    // validate user request data
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res
        .status(422)
        .json({
          status: 'error',
          message: 'Invalid user input',
          data: validationError.array(),
        });
    }

    return next();
  },
  validators,
};
