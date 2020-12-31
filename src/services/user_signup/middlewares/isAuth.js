const { verify, TokenExpiredError } = require('jsonwebtoken');
const config = require('../../../config');

const confirmEmail = (req, res, next) => verify(
  req.params.token,
  config.jwt.secret,
  {
    algorithms: [config.jwt.algorithm],
    issuer: 'Smart Auto LTD',
    audience: ['user'],
  },
  (err, payload) => {
    if (err) {
      // On error
      if (err instanceof TokenExpiredError) {
        // If token has expired
        return res
          .status(403)
          .json({
            status: 'expired',
            msg: 'Session expired',
            data: {},
          });
      }

      // Errors beyond expiration
      return res
        .status(403)
        .json({
          status: 'failed',
          msg: 'Login to continue',
          data: {},
        });
    }

    req.body = payload;
    return next();
  },
);

module.exports = { confirmEmail };
