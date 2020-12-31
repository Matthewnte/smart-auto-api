const mongoose = require('mongoose');
const config = require('..');
const logger = require('../../loaders/logger');

// replace password with placeholder with database password
const DB = config.db.url.replace('<password>', config.db.password);

// Connect mongo database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => logger.info('DB connection successful'));
