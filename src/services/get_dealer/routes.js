// Require middlewares
const { validators, isRequestValid } = require('./middlewares');
// Require dealer model
const DealerModel = require('../../models/dealer');
// require dealerLogin contoller
const { getAllDealers, getOneDealer } = require('./controllers')({ DealerModel });

module.exports = (router) => {
  router.get('/dealers', validators.listDealers, isRequestValid, getAllDealers);
  router.get('/dealers/:dealerId', getOneDealer);
};
