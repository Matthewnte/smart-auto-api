// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const events = require('events');

const eventEmitter = new events.EventEmitter();

class AuthService {
  constructor(userModel) {
    this.userModel = userModel;

    // subcribe to user signup event
    eventEmitter.on('user_signup', (user) => {
      console.log('auth', user);
    });

    // return { user: userRecord };
  }

  // async SignIn(email, password) {
  //   const user = await this.userModel.findOne({ email });

  //   // Verify user email and password
  //   const isPasswordValid = await bcrypt.compare(password, user.password);

  //   if (!user || !isPasswordValid) {
  //     throw new Error('Incorrect email or password');
  //   }
  // }
}

module.exports = AuthService;
