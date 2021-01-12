const express = require('express');
// const rateLimit = require('express-rate-limit');

const helmet = require('helmet');
// const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean');
// const hpp = require('hpp');
const cors = require('cors');

// Require session
const session = require('express-session');

// Require Passport
const passport = require('passport');

// import error handler
// const errorHandler = require('./loaders/errorHandler');

// dependency injection
// require('./loaders/di_injection');

// Require routes
const services = require('./services');

// Require configs
const config = require('./config');

// Require passport-strategies
const passportStrategies = require('./config/passport-strategies');

// Initialize express app
const app = express();

// Enable CORS
app.use(cors());

// set secure http headers
app.use(helmet());

// Parse incoming JSON requests
app.use(express.json());

app.use(session(config.session));

// Initiate Passport for app
passport.use(passportStrategies.auth0Strategy);
app.use(passport.initialize());
app.use(passport.session());

// Support login sessions
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Data sanitization against NoSql injection
// app.use(mongoSanitize());

// Data sanitization against XSS attack
// app.use(xss());

// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       'ratingsQuantity',
//       'ratingsAverage',
//       'price',
//       'maxNumberOfAttendees',
//     ],
//   })
// );

// Limit amount of login tries
// const limiter = rateLimit({
//   max: 7,
//   windowMs: 60 * 60 * 1000,
//   message: {
//     status: 'error',
//     message: 'Too many failed attempts, please try again in 30 mins!',
//   },
// });
// app.use('/api/v1/users/login', limiter);

// API entry
app.use(`/api/v${config.api.version}`, services);

// handle all errors
// app.use(errorHandler);

module.exports = app;
