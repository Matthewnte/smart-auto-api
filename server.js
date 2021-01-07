const config = require('./src/config');

const logger = require('./src/loaders/logger');

// connect mongoDB
require('./src/config/db/mongoose');

const app = require('./src/app');

// Handle Uncaught Exception
// process.on('uncaughtException', (err) => {
//   logger.error('UNCAUGHT EXCEPTION! Shutting down...');
//   logger.error(err.name, err.message);
//   process.exit(1);
// });

// listen for request on port
app.listen(config.api.port, () => logger.info(`Server listening on port: ${config.api.port}`));

// Handle unhandled rejection
// process.on('unhandledRejection', (err) => {
//   logger.error('UNHANDLED REJECTION! Shutting down...');
//   logger.error(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });
