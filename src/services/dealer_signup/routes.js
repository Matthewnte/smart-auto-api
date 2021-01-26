// Require routers
const { Router } = require('express');

// Require middlewares
const { isAuth, validators, isRequestValid } = require('./middlewares');

// Require dealer model
const DealerModel = require('../../models/dealer');

// require dealerSignup contoller
const { getDealerDetails, createDealer } = require('./controllers')({ DealerModel });

// Initiate router
const router = Router();

// Define routes
router.post('/auth/dealer/signup', validators.signup, isRequestValid, getDealerDetails);
router.get('/auth/dealer/confirmEmail/:token', isAuth.confirmEmail, validators.signup, isRequestValid, createDealer);

// Expose routes
module.exports = router;
