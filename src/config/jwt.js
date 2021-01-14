const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwkAuthz = require('express-jwt-authz');
const config = require('.');

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: config.auth0.jwks.rpm,
    jwksUri: config.auth0.jwks.uri,
  }),
  audience: config.auth0.jwt.aud,
  issuer: config.auth0.jwt.iss,
  algorithms: [config.auth0.jwt.algo],
});

/**
 * Middleware to be called to check JWT for permissions
 * @param {string[]} permissions A list of minimum user permissions required to access the endpoint
 */
const permissionsCheck = (permissions) => jwkAuthz(permissions, { customScopeKey: 'permissions', failWithError: false });

module.exports = {
  jwtCheck, permissionsCheck,
};
