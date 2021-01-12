// Require router
const { Router } = require('express');

// Require middlewares
const { validators, isRequestValid } = require('./middlewares');

// Require user model
const UserModel = require('../../models/user');

// require userLogin contoller
const { getAllUsers, getOneUser } = require('./controllers')({ UserModel });

// Initiate router
const router = Router();

// Define routes
router.get('/users', validators.listUsers, isRequestValid, getAllUsers);
router.get('/users/:userId', getOneUser);

// Expose routes
module.exports = router;
