// require userSignup contoller
const { getUserDetails, createUser } = require('./controllers')();

module.exports = (router) => {
  router.post('/auth/signup', getUserDetails);
  router.get('/users/confirmEmail/:token', createUser);
};
