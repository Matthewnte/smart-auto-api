// Require router
const { Router } = require('express');

// Require middlewares
const { isAuth, validators, isRequestValid } = require('./middlewares');

// Require user model
const UserModel = require('../../models/user');

// require userSignup contoller
const { getUserDetails, createUser } = require('./controllers')({ UserModel });

// Initiate router
const router = Router();

// Define routes
router.post('/auth/user/signup', validators.signup, isRequestValid, getUserDetails);
router.get('/auth/user/confirmEmail/:token', isAuth.confirmEmail, validators.signup, isRequestValid, createUser);

// Expose routes
module.exports = router;
