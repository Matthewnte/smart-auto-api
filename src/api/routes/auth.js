const userService = require('../../services/user');
// const { container } = require('../../loaders/di_injection');

// console.log(container.resolve('userService'));

// const userService = container.resolve('userService');

const ApiError = require('../../loaders/apiError');
const catchAsyncError = require('../../loaders/catchAsync');

// require userSignup route
const { userSignup } = require('../controllers/auth')(
  catchAsyncError,
  ApiError,
  userService,
);

module.exports = (router) => {
  router.post('/auth/signup', userSignup);
};
