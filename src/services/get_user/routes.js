// Require middlewares
const { validators, isRequestValid } = require('./middlewares');
// Require user model
const UserModel = require('../../models/user');
// require userLogin contoller
const { getAllUsers, getOneUser } = require('./controllers')({ UserModel });

module.exports = (router) => {
  router.get('/users', validators.listUsers, isRequestValid, getAllUsers);
  router.get('/users/:userId', getOneUser);
};
