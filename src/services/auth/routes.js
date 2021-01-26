// Require middlewares
const { Router } = require('express');
const passport = require('passport');
// const config = require('../../config');

// Initiate router
const router = Router();

// Define routes

// To login with username/password
router.get(
  '/auth/login',
  passport.authenticate(
    'auth0',
    {
      scope: 'openid email profile',
    },
  ),
);

// On successful login
router.get(
  '/auth/login/callback',
  (req, res, next) => {
    passport.authenticate('auth0', (authErr, user, info) => {
      if (authErr) {
        return next(authErr);
      }

      if (!user) {
        return res.redirect('/api/v1.0.0/auth/login');
      }

      return req.logIn(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }

        const { returnTo } = req.session;
        delete req.session.returnTo;
        return res.json({ user, info, returnTo });
        // return res.redirect(returnTo || config.client.baseUrl);
      });
    })(req, res, next);
  },
);

// To logout
router.get('/auth/logout', (req, res) => {
  req.logOut();

  let returnTo = `${req.protocol}://${req.hostname}`;
  const port = req.socket.localPort;

  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo = process.env.NODE_ENV === 'production'
      ? `${returnTo}/api/v${process.env.API_VERSION}`
      : `${returnTo}:${port}/api/v${process.env.API_VERSION}`;
  }

  const logoutURL = new URL(
    `https://${process.env.AUTH0_DOMAIN}/v${process.env.AUTH0_VERSION}/logout`,
  );

  logoutURL.search = `client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${returnTo}`;

  res.redirect(logoutURL);
});

// Expose routes
module.exports = router;
