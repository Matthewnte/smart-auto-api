// Require router
const { Router } = require('express');

// Require middlewares
const { validators, isRequestValid } = require('./middlewares');

// Require user model
const UserModel = require('../../models/user');

// Require userLogin contoller
const { auth } = require('./controllers')({ UserModel });

// Initiate router
const router = Router();

// Define routes
router.post('/auth/user/login', validators.login, isRequestValid, auth);

// Expose routes
module.exports = router;
