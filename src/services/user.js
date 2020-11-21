/* eslint-disable global-require */
const { EventEmitter } = require('events');
const UserModel = require('../models/user');

const eventEmitter = new EventEmitter();

class UserService {
  async signup(userData, url) {
    // require subscriber module and pass eventEmitter instance
    require('./email')(eventEmitter, url);
    const authService = require('./auth')(eventEmitter);

    // create new user
    const user = await UserModel.create(userData);
    let userToken;

    // listen subscribe to generate token event
    authService.on('token', (token) => {
      userToken = token;
    });

    // publish user_signup event
    eventEmitter.emit('user_signup', user);

    return { user, userToken };
  }
}

module.exports = new UserService();
