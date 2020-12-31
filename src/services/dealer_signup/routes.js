// Require middlewares
const { isAuth, validator, isRequestValid } = require('./middlewares');
// Require dealer model
const DealerModel = require('../../models/dealer');
// require dealerSignup contoller
const { getDealerDetails, createDealer } = require('./controllers')({ DealerModel });

module.exports = (router) => {
  router.post('/auth/dealer/signup', validator.signup, isRequestValid, getDealerDetails);
  router.get('/auth/dealer/confirmEmail/:token', isAuth.confirmEmail, validator.signup, isRequestValid, createDealer);
};
