const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
const { google } = require('googleapis');
const config = require('../config');
const logger = require('../loaders/logger');

class EmailService {
  constructor(signupEmitter, url) {
    this.url = url;
    signupEmitter.on('user_signup', async (user) => {
      this.sendSignupEmail(user);
    });
  }

  // create transporter object
  async createTransport() {
    // setup oauth2
    const oAuth2Client = new google.auth.OAuth2(
      config.oauth2.clientId,
      config.oauth2.clientSecret,
      config.oauth2.redirectUri,
    );
    oAuth2Client.setCredentials({ refresh_token: config.oauth2.refreshToken });
    const accessToken = await oAuth2Client.getAccessToken();

    // Create a transporter
    if (process.env.NODE_ENV === 'production') {
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
  }

  async sendEmail(user, transporter) {
    // Define email user
    const mailOptions = {
      from: `Smart Autos <${config.email.user}>`,
      to: user.email,
      subject: user.subject,
      html: user.html,
      text: htmlToText.fromString(user.html),
    };

    // Send email
    await transporter.sendMail(mailOptions);
  }

  /**
   * @description Generate confirmation token
   * @param {*} user User record
   */
  generateConfirmToken(user) {
    const emailConfirmToken = user.generateEmailConfirmToken();
    user.save({ validateBeforeSave: false });
    return emailConfirmToken;
  }

  /**
   * @description Create account confirmation url
   * @param {*} req email confirmation token
   */
  createEmailConfirmUrl(emailConfirmToken) {
    const confirmEmailUrl = `${this.url}/api/v1/users/confirmEmail/${emailConfirmToken}`;
    return confirmEmailUrl;
  }

  /**
   * @description Create email content
   * @param {*} user user record
   * @param {*} template template file to render
   * @param {*} confirmEmailUrl Email confirmation url
   * @param {*} subject Email subject
   */
  emailOutput({ firstName }, template, confirmEmailUrl, subject) {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName,
        url: confirmEmailUrl,
        subject,
      },
    );
    return html;
  }

  /**
   * @description Send signup email
   * @param {*} user User record
   */
  async sendSignupEmail(user) {
    logger.info('Sending user_singup confirmation email');
    const emailConfirmToken = this.generateConfirmToken(user);
    const emailConfirmUrl = this.createEmailConfirmUrl(emailConfirmToken);
    const html = this.emailOutput(
      user,
      'welcome',
      emailConfirmUrl,
      'Confirm your account',
    );
    const transporter = await this.createTransport();
    await this.sendEmail(
      {
        email: user.email,
        subject: 'Confirm your account',
        html,
      },
      transporter,
    );
    logger.info('User signup confirmation email sent');
  }
}

module.exports = (signupEmitter, req) => new EmailService(signupEmitter, req);
