const mongoose = require('mongoose');
const logger = require('../../loaders/logger');
const config = require('..');

// Connect mongo database
const mongoConnection = () => {
  mongoose
    .connect(config.db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

  const db = mongoose.connection;
  db.on('error', logger.error.bind(console, 'DB CONNECTION ERROR:'));
  db.once('open', () => logger.info('DB CONNECTED ✅'));
};

module.exports = mongoConnection;
