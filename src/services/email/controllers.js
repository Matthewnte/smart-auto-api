const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
const { google } = require('googleapis');
const path = require('path');
const config = require('../../config');
const logger = require('../../loaders/logger');

/**
 * @description Email service
 * @param {object} user Receipient details
 * @param {string} user.email Receipient email address
 * @param {string} user.firstName Receipient first name
 * @param {string} user.lastName Receipient last name
 * @param {string} user.emailConfirmToken JWT token to validate request initiated via email
 * @param {object} content Email content
 * @param {string} content.subject Email subject
 * @param {string} content.html Email body as HTML
 * @param {object} params Other data
 */
const emailService = async (user, content, params) => {
  /**
   * Private properties and methods
   */
  const privates = {
    /**
     * Email transporter object
     */
    transporter: await (async () => {
      // Create a transporter
      if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
        // setup oauth2
        const oAuth2Client = new google.auth.OAuth2(
          config.google.clientId,
          config.google.clientSecret,
          config.google.redirectUri,
        );
        oAuth2Client.setCredentials({ refresh_token: config.google.refreshToken });

        // Get Google OAuth2 access token
        const accessToken = await oAuth2Client.getAccessToken();

        // Create and return Google mail transport
        return nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: config.google.user,
            clientId: config.google.clientId,
            clientSecret: config.google.clientSecret,
            refreshToken: config.google.refreshToken,
            accessToken,
          },
        });
      }

      // Create and return generic mail transport
      return nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        auth: {
          user: config.email.user,
          pass: config.email.password,
        },
      });
    })(),

    /**
     * @description Create email body content
     * @param {string} template Email HTML template
     * @param {string} url Link to webpage for further actions
     */
    emailOutput(template, url) {
      // Define HTML data from pug file
      const html = pug.renderFile(
        path.resolve(__dirname, `../../views/emails/${template}.pug`),
        { firstName: user.firstName, url, subject: content.subject },
      );

      // Return HTML data
      return html;
    },

    /**
     * @description Create account confirmation url
     */
    createEmailConfirmUrl(role) {
      const confirmEmailUrl = `${params.url}/api/v${config.api.version}/auth/${role}/confirmEmail/${user.emailConfirmToken}`;
      return confirmEmailUrl;
    },
  };

  /**
   * Public properties and methods
   */
  const publics = {
    /**
     * Send email to instantiated receipient, with instantiated details.
     */
    async sendEmail(options) {
      let subject;
      let html;

      switch (options.service) {
        case 'user_signup':
          subject = options.subject;
          html = options.html;
          break;

        case 'dealer_signup':
          subject = options.subject;
          html = options.html;
          break;

        default:
          subject = content.subject;
          html = content.html;
          break;
      }

      // Define email options
      const mailOptions = {
        from: `Smart Autos <${config.email.user || config.google.user}>`,
        to: user.email,
        subject,
        html,
        text: htmlToText.htmlToText(content.html),
      };

      // Send email
      await privates.transporter.sendMail(mailOptions)
        .then(() => logger.info('Email sent'))
        .catch((err) => logger.error(err));
    },

    /**
     * Send signup confirmation email.
     */
    async sendSignupEmail(role) {
      logger.info(`Sending ${role}_singup confirmation email`);
      const emailConfirmUrl = privates.createEmailConfirmUrl(role);
      const html = privates.emailOutput('welcome', emailConfirmUrl);

      // Send email to confirm user signup
      await this.sendEmail(
        {
          service: `${role}_signup`, subject: 'Confirm your account', html,
        },
      );
    },
  };

  // Expose service API functions
  return publics;
};

// Export email service function
module.exports = emailService;
