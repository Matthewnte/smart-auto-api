// Require middlewares
const { validators, isRequestValid } = require('./middlewares');
// Require user model
const UserModel = require('../../models/user');
// require userLogin contoller
const { auth } = require('./controllers')({ UserModel });

module.exports = (router) => {
  router.post('/auth/user/login', validators.login, isRequestValid, auth);
};
