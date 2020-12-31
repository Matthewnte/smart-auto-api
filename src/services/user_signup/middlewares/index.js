const { validationResult } = require('express-validator');
const isAuth = require('./isAuth');
const validator = require('./requestValidator');

module.exports = {
  isAuth: {
    confirmEmail: isAuth.confirmEmail,
  },
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
  validator,
};
