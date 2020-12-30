const jwt = require('jsonwebtoken');
const EmailService = require('../email/controllers');
const config = require('../../config');

const regControllers = (models) => {
  /**
   * Public properties and methods
   */
  const publics = {
    getUserDetails: async (req, res) => {
      // get request body
      const { body: reqBody } = req;

      // get base url
      const url = `${req.protocol}://${req.get('host')}`;

      // Generate token to confirm user email
      const token = jwt.sign(reqBody, config.jwtSecret, {
        expiresIn: 600, audience: 'user', issuer: 'Smart Auto LTD',
      });

      // Define email service params
      const emailReceipent = {
        email: reqBody.email,
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        emailConfirmToken: token,
      };
      const emailContent = {};
      const emailParams = { url };

      const emailService = EmailService(emailReceipent, emailContent, emailParams);
      emailService.sendSignupEmail();

      // return response
      return res
        .status(200)
        .json({
          status: 'success',
          message: `Check your email ${reqBody.email} for verification`,
          data: {},
        });
    },

    createUser: async (req, res) => {
      // get request data
      const { param: reqParam } = req;

      // Get user details
      const payload = jwt.verify(reqParam.token, config.jwtSecret, {
        algorithms: ['HS256'], audience: 'user', issuer: 'Smart Auto LTD',
      });

      // Create user profile
      const user = await models.UserModel.create({ ...payload });

      // Setup payload for access and refresh tokens
      const tokenPayload = { ...user };

      // Setup options for access and refresh tokens
      const userTokenOptions = {
        expiresIn: 600, audience: 'user', issuer: 'Smart Auto LTD', algorithm: 'HS256',
      };

      // Setup access token
      const accessToken = jwt.sign(tokenPayload, config.jwtSecret, userTokenOptions);

      // Setup refresh token
      userTokenOptions.expiresIn = '30d';
      const refreshToken = jwt.sign(tokenPayload, config.jwtSecret, userTokenOptions);

      // Setup cookies
      const version = process.env.VERSION || 'v1.0.0';
      const cookieOptions = {
        maxAge: 30 * 24 * 3600000,
        secure: false,
        sameSite: 'none',
        httpOnly: true,
        path: `/api/${version}/auth/refresh`,
        domain: req.hostname !== 'localhost' ? `.${req.hostname}` : 'localhost',
      };

      // return response
      return res
        .status(201)
        .header('Authorization', accessToken)
        .cookie('Smart-Auto-API-Refresh', refreshToken, cookieOptions)
        .json({
          status: 'success',
          data: { ...user },
        });
    },
  };

  // Expose service API functions
  return publics;
};

module.exports = regControllers;
