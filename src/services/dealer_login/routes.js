// Require middlewares
const { validators, isRequestValid } = require('./middlewares');
// Require dealer model
const DealerModel = require('../../models/dealer');
// require dealerLogin contoller
const { auth } = require('./controllers')({ DealerModel });

module.exports = (router) => {
  router.post('/auth/dealer/login', validators.login, isRequestValid, auth);
};
