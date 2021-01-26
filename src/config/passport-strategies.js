const Auth0Strategy = require('passport-auth0');
const config = require('.');

const auth0Strategy = new Auth0Strategy(
  {
    domain: config.auth0.domain,
    clientID: config.auth0.clientId,
    clientSecret: config.auth0.clientSecret,
    callbackURL: config.auth0.callbackUrl,
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    const user = { extraParams, profile };
    return done(null, user);
  },
);

module.exports = { auth0Strategy };
