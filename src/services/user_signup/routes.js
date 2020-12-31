// Require middlewares
const { isAuth, validator, isRequestValid } = require('./middlewares');
// Require user model
const UserModel = require('../../models/user');
// require userSignup contoller
const { getUserDetails, createUser } = require('./controllers')({ UserModel });

module.exports = (router) => {
  router.post('/auth/users/signup', validator.signup, isRequestValid, getUserDetails);
  router.get('/auth/users/confirmEmail/:token', isAuth.confirmEmail, validator.signup, isRequestValid, createUser);
};
