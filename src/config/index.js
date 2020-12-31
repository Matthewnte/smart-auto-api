const envFound = require('dotenv').config();

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {

  /**
   * API configs
   */
  api: {
    port: Number.isNaN(parseInt(process.env.PORT, 10))
      ? 3000 : parseInt(process.env.PORT, 10),
    prefix: '/api',
    version: process.env.API_VERSION || '1.0.0',
  },

  // Winston logger
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  // Database
  db: {
    url: process.env.MONGODB_URI,
    password: process.env.MONGODB_PASSWORD,
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET,
    algorithm: process.env.JWT_ALGO || 'HS256',
    expiresIn: process.env.JWT_EXPIRES_IN || '10 minutes',
    refreshesIn: process.env.JWT_REFRESHES_IN || '30 days',
  },

  // Nodemailer
  email: {
    userName: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.AUTH_USER,
  },

  // Google API
  oauth2: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
    refreshToken: process.env.REFRESH_TOKEN,
  },

  // Agenda.js
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  },

  // Agendash
  agendash: {
    user: 'agendash',
    password: '123456',
  },
};
