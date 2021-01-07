const winston = require('winston');
const config = require('../config');

const transports = [];
if (process.env.NODE_ENV !== 'development') {
  transports.push(
    new winston.transports.Console(),
  );
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      ),
    }),
  );
}

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports,
  handleExceptions: true,
});

module.exports = LoggerInstance;

// initialising console transport - for redirecting log output to console
// const consoleTransport = new winston.transports.Console();

// initialising file transport for error logs
// const errorLogsFileTransport = new winston.transports.File({
//  filename: 'error.log', level: 'error'
// });

// initialising file transport for all logs
// const allLogsFileTransport = new winston.transports.File({
//  filename: 'all_logs.log', level: 'info'
// });
