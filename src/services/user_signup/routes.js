// Require middlewares
const { isAuth, validators, isRequestValid } = require('./middlewares');
// Require user model
const UserModel = require('../../models/user');
// require userSignup contoller
const { getUserDetails, createUser } = require('./controllers')({ UserModel });

module.exports = (router) => {
  router.post('/auth/user/signup', validators.signup, isRequestValid, getUserDetails);
  router.get('/auth/user/confirmEmail/:token', isAuth.confirmEmail, validators.signup, isRequestValid, createUser);
};
