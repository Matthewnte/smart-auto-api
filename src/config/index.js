// Initiate .env
require('dotenv').config();

// Expose values
const env = {
  /**
   * API configs
   */
  api: {
    port: Number.isNaN(parseInt(process.env.PORT, 10))
      ? 3000 : parseInt(process.env.PORT, 10),
    prefix: '/api',
    version: process.env.API_VERSION || '1.0.0',
    env: process.env.NODE_ENV || 'development',
  },

  // Winston logger
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  // Database
  db: {
    url: process.env.MONGODB_URI,
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
    user: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
  },

  // Google API
  google: {
    user: process.env.GOOGLE_AUTH_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },

  // Agenda.js
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  },

  // Auth0
  auth0: {
    domain: process.env.AUTH0_DOMAIN,
    version: process.env.AUTH0_VERSION,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackUrl: process.env.AUTH0_CALLBACK_URL,
    jwt: {
      aud: process.env.AUTH0_AUD,
      iss: process.env.AUTH0_ISS,
      algo: process.env.AUTH0_ALGO,
    },
    jwks: {
      uri: process.env.AUTH0_JWKS_URI,
      rpm: process.env.AUTH0_RPM,
    },
  },

  // Session
  session: {
    secret: process.env.SESSION_SECRET,
    cookie: {
      // Serve secure cookies, requires HTTPS
      secure: process.env.NODE_ENV === 'production',
    },
    resave: false,
    saveUninitialized: false,
  },

  // Client side
  client: {
    baseUrl: process.env.CLIENT_BASEURL,
  },

  // Agendash
  agendash: {
    user: 'agendash',
    password: '123456',
  },
};

module.exports = env;
