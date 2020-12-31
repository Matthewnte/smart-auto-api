const { Router } = require('express');
const userSignup = require('./user_signup/routes');
const dealerSignup = require('./dealer_signup/routes');
// const user = require('./routes/user');
// const agendash = require('./routes/agendash');

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();
  userSignup(app);
  dealerSignup(app);
  // user(app);
  // agendash(app);

  return app;
};
