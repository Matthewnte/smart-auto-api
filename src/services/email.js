const nodemailer = require('nodemailer');
const config = require('../config');
const logger = require('../loaders/logger');

class EmailService {
  constructor(signupEmitter, req) {
    this.req = req;
    signupEmitter.on('user_signup', (user) => {
      logger.info('Sending singup email');
      const emailConfirmToken = this.generateConfirmToken(user);
      const emailConfirmUrl = this.createEmailConfirmUrl(emailConfirmToken);
      const output = this.emailOutput(user, emailConfirmUrl);
      this.sendEmail({
        email: user.email,
        subject: 'Confirm your account',
        output,
      });
      logger.info('Signup email sent');
    });
  }

  async sendEmail(user) {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      auth: {
        user: config.email.userName,
        pass: config.email.password,
      },
    });

    // Define email user
    const mailOptions = {
      from: 'Smart Autos <test@eventonline.com>',
      to: user.email,
      subject: user.subject,
      text: user.output,
      html: user.output,
    };

    // Send email
    await transporter.sendMail(mailOptions);
  }

  generateConfirmToken(user) {
    const emailConfirmToken = user.generateEmailConfirmToken();
    user.save({ validateBeforeSave: false });
    return emailConfirmToken;
  }

  createEmailConfirmUrl(emailConfirmToken) {
    const confirmEmailUrl = `${this.req.protocol}://${this.req.get(
      'host',
    )}/api/v1/users/confirmEmail/${emailConfirmToken}`;
    return confirmEmailUrl;
  }

  emailOutput(user, emailConfirmUrl) {
    const output = `
      <h2>Hello ${user.firstName}</h2>
      <p>Please click on the link below to confirm your account.\n${emailConfirmUrl}</p>
    `;
    return output;
  }
}

module.exports = (signupEmitter, req) => new EmailService(signupEmitter, req);
