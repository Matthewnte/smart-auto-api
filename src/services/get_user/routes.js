// Require router
const { Router } = require('express');

// Require middlewares
const { validators, isRequestValid } = require('./middlewares');
const routeProtectors = require('../../config/jwt');

// Require user model
const UserModel = require('../../models/user');

// require userLogin contoller
const { getAllUsers, getOneUser } = require('./controllers')({ UserModel });

// Initiate router
const router = Router();

// Define routes
router.get(
  '/users',
  validators.auth,
  isRequestValid,
  routeProtectors.jwtCheck,
  routeProtectors.jwtErrHandler,
  routeProtectors.permissionsCheck(['read:users']),
  validators.listUsers,
  isRequestValid,
  getAllUsers,
);
router.get('/users/:userId', getOneUser);

// Expose routes
module.exports = router;
