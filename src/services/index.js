const userAuth = require('./auth/routes');
const userLogin = require('./user_login/routes');
const dealerLogin = require('./dealer_login/routes');
const userSignup = require('./user_signup/routes');
const dealerSignup = require('./dealer_signup/routes');
const getDealer = require('./get_dealer/routes');
const getUser = require('./get_user/routes');

module.exports = [
  userSignup,
  dealerSignup,
  userAuth,
  userLogin,
  dealerLogin,
  getDealer,
  getUser,
];
