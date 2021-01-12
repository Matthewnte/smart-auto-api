// Require router
const { Router } = require('express');

// Require middlewares
const { validators, isRequestValid } = require('./middlewares');

// Require dealer model
const DealerModel = require('../../models/dealer');

// require dealerLogin contoller
const { getAllDealers, getOneDealer } = require('./controllers')({ DealerModel });

// Initiate router
const router = Router();

// Define routes
router.get('/dealers', validators.listDealers, isRequestValid, getAllDealers);
router.get('/dealers/:dealerId', getOneDealer);

// Expose routes
module.exports = router;
