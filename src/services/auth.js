// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class AuthService {
  constructor(eventEmitter, event) {
    eventEmitter.on(event, (user) => {
      switch (event) {
        case 'user_signup':
          this.signUp(user);
          break;
        default:
          break;
      }
    });
  }

  signUp(user) {
    console.log('Registering user');
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

module.exports = AuthService;

// return { user: userRecord };

// async SignIn(email, password) {
//   const user = await this.userModel.findOne({ email });

//   // Verify user email and password
//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!user || !isPasswordValid) {
//     throw new Error('Incorrect email or password');
//   }
// }
