// Require middlewares
const { isAuth, validators, isRequestValid } = require('./middlewares');
// Require dealer model
const DealerModel = require('../../models/dealer');
// require dealerSignup contoller
const { getDealerDetails, createDealer } = require('./controllers')({ DealerModel });

module.exports = (router) => {
  router.post('/auth/dealer/signup', validators.signup, isRequestValid, getDealerDetails);
  router.get('/auth/dealer/confirmEmail/:token', isAuth.confirmEmail, validators.signup, isRequestValid, createDealer);
};
