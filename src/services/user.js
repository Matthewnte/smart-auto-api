/* eslint-disable class-methods-use-this */
const events = require('events');

const eventEmitter = new events.EventEmitter();
const userModel = require('../models/user');

class UserService {
  async signup(user) {
    // const userRecord = await userModel.create(user);

    // publish user signup event
    eventEmitter.emit('user_signup', user);

    return { user };
  }

  // getUser(userId) {
  //   const user = this.userModel.findById(userId);
  //   return user;
  // }
}

module.exports = new UserService();
