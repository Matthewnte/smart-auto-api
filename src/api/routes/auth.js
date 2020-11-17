const userService = require('../../services/user');

// const AppError = require('../../loaders/appError');

// require userSignup route
const { userSignup } = require('../controllers/auth')(null, userService);

module.exports = (app) => {
  app.post('/auth/signup', userSignup);
};
