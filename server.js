// Require app cluster
const cluster = require('cluster');

// Require system CPUs object
const { cpus } = require('os');

// Require app config
const config = require('./src/config');

// Require app logger
const logger = require('./src/loaders/logger');

// Require and connect MongoDB
const mongoose = require('./src/config/db/mongoose');

// Require app
const app = require('./src/app');

// Check that cluster is master on production
if (
  (
    config.api.env === 'production'
    || config.api.env === 'staging'
  )
  && cluster.isMaster
) {
  // Get number of system processors
  const workersLength = cpus().length;

  logger.info(`Master cluster setting up ${workersLength} workers...`);

  for (let i = 0; i < workersLength; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    logger.info(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    logger.info(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
    logger.info('Starting a new worker...');
    cluster.fork();
  });
} else {
  // Connect MongoDB
  mongoose();

  // Listen for request on server
  app.listen(config.api.port, () => logger.info(`Server listening on port: ${config.api.port}`));

  // Handle Uncaught Exception
  // process.on('uncaughtException', (err) => {
  //   logger.error('UNCAUGHT EXCEPTION! Shutting down...');
  //   logger.error(err.name, err.message);
  //   process.exit(1);
  // });

  // Handle unhandled rejection
  // process.on('unhandledRejection', (err) => {
  //   logger.error('UNHANDLED REJECTION! Shutting down...');
  //   logger.error(err.name, err.message);
  //   server.close(() => {
  //     process.exit(1);
  //   });
  // });
}
