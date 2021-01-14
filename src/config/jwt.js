const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwkAuthz = require('express-jwt-authz');
const config = require('.');
const logger = require('../loaders/logger');

// Define JWT checker
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

// Define JWT error handler
const jwtErrHandler = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    // Log error
    logger.error(err);

    // Return failed response
    return res.status(401).send({
      status: 'Failed',
      msg: 'Invalid access',
      data: {},
    });
  }

  // Get to the next middleware
  return next();
};

/**
 * Middleware to be called to check JWT for permissions
 * @param {string[]} permissions A list of minimum user permissions required to access the endpoint
 */
const permissionsCheck = (permissions) => jwkAuthz(permissions, { customScopeKey: 'permissions', failWithError: false });

module.exports = {
  jwtCheck, jwtErrHandler, permissionsCheck,
};
