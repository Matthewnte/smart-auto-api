const { EventEmitter } = require('events');

const eventEmitter = new EventEmitter();

// pass event instance to subscribers
require('./email')(eventEmitter);
const AuthService = require('./auth');

const authService = new AuthService(eventEmitter, 'user_signup');

class UserService {
  signup(user) {
    eventEmitter.emit('user_signup', user);
    return user;
  }
}

module.exports = new UserService();
