const logger = require('./src/loaders/logger');

// Handle Uncaught Exception
process.on('uncaughtException', (err) => {
  logger.info('UNCAUGHT EXCEPTION! Shutting down...');
  logger.info(err.name, err.message);
  process.exit(1);
});

const app = require('./src/app');
const config = require('./src/config');

// connect mongoDB
require('./src/config/db/mongoose');

// listen for request on port
const server = app.listen(config.port, () =>
  logger.info(`Server listening on port: ${config.port}`));

// Handle unhandled rejection
process.on('unhandledRejection', (err) => {
  logger.info('UNHANDLED REJECTION! Shutting down...');
  logger.info(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
