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
      if (process.env.NODE_ENV === 'production') {
        // setup oauth2
        const oAuth2Client = new google.auth.OAuth2(
          config.oauth2.clientId,
          config.oauth2.clientSecret,
          config.oauth2.redirectUri,
        );
        oAuth2Client.setCredentials({ refresh_token: config.oauth2.refreshToken });
        const accessToken = await oAuth2Client.getAccessToken();

        return nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: config.email.user,
            clientId: config.oauth2.clientId,
            clientSecret: config.oauth2.clientSecret,
            refreshToken: config.oauth2.refreshToken,
            accessToken,
          },
        });
      }

      return nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        auth: {
          user: config.email.userName,
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
      const html = pug.renderFile(
        path.resolve(__dirname, `../../views/emails/${template}.pug`),
        { firstName: user.firstName, url, subject: content.subject },
      );
      return html;
    },
    /**
     * @description Create account confirmation url
     */
    createEmailConfirmUrl() {
      const confirmEmailUrl = `${params.url}/api/v${config.api.version}/auth/users/confirmEmail/${user.emailConfirmToken}`;
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

        default:
          subject = content.subject;
          html = content.html;
          break;
      }

      // Define email options
      const mailOptions = {
        from: `Smart Autos <${config.email.user}>`,
        to: user.email,
        subject,
        html,
        text: htmlToText.htmlToText(content.html),
      };

      // Send email
      await privates.transporter.sendMail(mailOptions);

      logger.info('Email sent');
    },
    /**
     * Send signup confirmation email.
     */
    async sendSignupEmail() {
      logger.info('Sending user_singup confirmation email');
      const emailConfirmUrl = privates.createEmailConfirmUrl();
      const html = privates.emailOutput('welcome', emailConfirmUrl);

      // Send email to confirm user signup
      await this.sendEmail(
        { service: 'user_signup', subject: 'Confirm your account', html },
      );
    },
  };

  // Expose service API functions
  return publics;
};

module.exports = emailService;
