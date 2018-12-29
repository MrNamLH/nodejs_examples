const path = require('path');
const winston = require('winston');

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize, json } = format;

const logFormat = printf(
  info => `${info.timestamp}-${info.level}: ${info.message}`
);
const logTimestamp = timestamp({ format: 'YYYY-MM-DD HH:mm:ss' });

const logger = createLogger({
  level: 'info',
  format: combine(logTimestamp, json()),
  transports: [
    // only error log
    new transports.File({
      level: 'error',
      filename: path.resolve(__dirname, '../logs/error.log'),
      timestamp: true
    }),

    // all application log
    new transports.File({
      filename: path.resolve(__dirname, '../logs/combined.log'),
      timestamp: true
    })
  ],
  exitOnError: false
});

// Add console log for development ENV
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(colorize(), logTimestamp, logFormat),
      handleExceptions: true
    })
  );
}

logger.info('test');

module.exports = { logger };
