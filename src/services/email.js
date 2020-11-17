// const bcrypt = require('bcryptjs');
const events = require('events');

const eventEmitter = new events.EventEmitter();

class EmailService {
  constructor() {
    // subcribe to user signup event
    eventEmitter.on('user_signup', (user) => {
      console.log('email', user);
    });

    // return { user: userRecord };
  }
}

module.exports = EmailService;
