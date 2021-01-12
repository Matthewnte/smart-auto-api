// Require routers
const { Router } = require('express');

// Require middlewares
const { validators, isRequestValid } = require('./middlewares');

// Require dealer model
const DealerModel = require('../../models/dealer');

// require dealerLogin contoller
const { auth } = require('./controllers')({ DealerModel });

// Initiate router
const router = Router();

// Define routes
router.post('/auth/dealer/login', validators.login, isRequestValid, auth);

// Expose routes
module.exports = router;
