const { Router } = require('express');
const userSignup = require('./user_signup/routes');
const dealerSignup = require('./dealer_signup/routes');
const userLogin = require('./user_login/routes');
const dealerLogin = require('./dealer_login/routes');
const getDealer = require('./get_dealer/routes');
// const user = require('./routes/user');
// const agendash = require('./routes/agendash');

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();
  userSignup(app); // User can sign up
  dealerSignup(app); // Dealer can sign up
  userLogin(app); // User can sign in
  dealerLogin(app); // Dealer can sign in
  getDealer(app); // Users can list, view and search dealers.
  // user(app);
  // agendash(app);

  return app;
};
