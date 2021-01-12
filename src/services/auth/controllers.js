const jwt = require('jsonwebtoken');
const config = require('../../config');

const regControllers = (models) => {
  /**
   * Public properties and methods
   */
  const publics = {
    auth: async (req, res) => {
      // Create user profile
      const user = await models.UserModel.findOne({ email: req.body.email });

      // Check against inexistent user
      if (!user) {
        return res.status(400).json({
          status: 'failed',
          msg: 'Invalid credentials user',
          data: {},
        });
      }

      // Verify user password
      return user.comparePassword(req.body.password, (err, isMatch) => {
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
          photo: user.photo,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };

        // Setup payload for access and refresh tokens
        const tokenPayload = { ...user };

        // Setup options for access and refresh tokens
        const userTokenOptions = {
          expiresIn: 600, audience: 'user', issuer: 'Smart Auto LTD', algorithm: 'HS256',
        };

        // Setup access token
        const accessToken = jwt.sign(tokenPayload, config.jwt.secret, userTokenOptions);

        // Setup refresh token
        userTokenOptions.expiresIn = '30d';
        const refreshToken = jwt.sign(tokenPayload, config.jwt.secret, userTokenOptions);

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
