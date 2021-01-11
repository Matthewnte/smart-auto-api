const jwt = require('jsonwebtoken');
const config = require('../../config');

const regControllers = (models) => {
  /**
   * Public properties and methods
   */
  const publics = {
    auth: async (req, res) => {
      // Create dealer profile
      const dealer = await models.DealerModel.findOne({ email: req.body.email });

      // Check against inexistent dealer
      if (!dealer) {
        return res.status(400).json({
          status: 'failed',
          msg: 'Invalid credentials',
          data: {},
        });
      }

      // Verify dealer password
      return dealer.comparePassword(req.body.password, (err, isMatch) => {
        // Check against error in password verification
        if (err) throw err;

        // Check against wrong password
        if (!isMatch) {
          return res.status(400).json({
            status: 'failed',
            msg: 'Invalid credentials pass',
            data: {},
          });
        }

        // Define response data
        const resData = {
          photo: dealer.photo,
          name: dealer.companyName,
          email: dealer.email,
          phone: dealer.phone,
          address: dealer.address,
        };

        // Setup payload for access and refresh tokens
        const tokenPayload = { ...dealer };

        // Setup options for access and refresh tokens
        const dealerTokenOptions = {
          expiresIn: 600, audience: 'dealer', issuer: 'Smart Auto LTD', algorithm: 'HS256',
        };

        // Setup access token
        const accessToken = jwt.sign(tokenPayload, config.jwt.secret, dealerTokenOptions);

        // Setup refresh token
        dealerTokenOptions.expiresIn = '30d';
        const refreshToken = jwt.sign(tokenPayload, config.jwt.secret, dealerTokenOptions);

        // Setup cookies
        const cookieOptions = {
          maxAge: 30 * 24 * 3600000,
          secure: false,
          sameSite: 'none',
          httpOnly: true,
          path: `/api/v${config.api.version}/auth/refresh`,
          domain: req.hostname !== 'localhost' ? `.${req.hostname}` : 'localhost',
        };

        // return response
        return res
          .status(201)
          .header('Authorization', accessToken)
          .cookie('Smart-Auto-API-Refresh', refreshToken, cookieOptions)
          .json({
            status: 'success',
            msg: 'You have been succesfully logged in',
            data: resData,
          });
      });
    },
  };

  // Expose service API functions
  return publics;
};

module.exports = regControllers;
