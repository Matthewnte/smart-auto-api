const EventEmitter = require('events');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

class AuthService extends EventEmitter {
  constructor(eventEmitter) {
    super();
    eventEmitter.on('user_signup', (user) => {
      console.log('Signing user up');
      this.generateToken(user);
    });
  }

  generateToken(user) {
    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });
    this.emit('token', token);
  }

  async signIn(email, password) {
    const user = await this.userModel.findOne({ email });

    // Verify user email and password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordValid) {
      throw new Error('Incorrect email or password');
    }
  }

  forgotPassword() {
    console.log('Forgot Password');
  }
}

module.exports = (eventEmitter) => new AuthService(eventEmitter);

// return { user: userRecord };

// async SignIn(email, password) {
//   const user = await this.userModel.findOne({ email });

//   // Verify user email and password
//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!user || !isPasswordValid) {
//     throw new Error('Incorrect email or password');
//   }
// }
