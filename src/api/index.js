const { Router } = require('express');
const auth = require('./routes/auth');
// const user = require('./routes/user');
// const agendash = require('./routes/agendash');

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();
  auth(app);
  // user(app);
  // agendash(app);

  return app;
};
