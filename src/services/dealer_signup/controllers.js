const jwt = require('jsonwebtoken');
const EmailService = require('../email/controllers');
const config = require('../../config');

const regControllers = (models) => {
  /**
   * Public properties and methods
   */
  const publics = {
    getDealerDetails: async (req, res) => {
      // get request body
      const { body: reqBody } = req;

      // get base url
      const url = `${req.protocol}://${req.get('host')}`;

      // Generate token to confirm user email
      const token = jwt.sign(reqBody, config.jwt.secret, {
        expiresIn: 600, audience: 'dealer', issuer: 'Smart Auto LTD',
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

      const emailService = await EmailService(emailReceipent, emailContent, emailParams);
      emailService.sendSignupEmail('dealer');

      // return response
      return res
        .status(200)
        .json({
          status: 'success',
          message: `Check your email ${reqBody.email} for verification`,
          data: {},
        });
    },

    createDealer: async (req, res) => {
      // Create user profile
      const user = await models.DealerModel.create({ ...req.body });

      // Define response data
      const resData = {
        photo: user.photo,
        name: user.companyName,
        email: user.email,
        phone: user.phone,
        address: user.address,
      };

      // Setup payload for access and refresh tokens
      const tokenPayload = { ...user };

      // Setup options for access and refresh tokens
      const userTokenOptions = {
        expiresIn: 600, audience: 'dealer', issuer: 'Smart Auto LTD', algorithm: 'HS256',
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
          msg: 'You have been succesfully registered and logged in',
          data: resData,
        });
    },
  };

  // Expose service API functions
  return publics;
};

module.exports = regControllers;
