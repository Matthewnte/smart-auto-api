module.exports = (eventEmitter) => eventEmitter.on('user_signup', () => {
  console.log('Sending email!');
});
