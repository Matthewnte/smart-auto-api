const awilix = require('awilix');
const UserService = require('../services/user');

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

(function setup() {
  container.register({
    userService: awilix.asClass(UserService),
  });
}());

module.exports = {
  container,
};
