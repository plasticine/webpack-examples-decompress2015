'use strict';

import path from 'path';
import winston from 'winston';
winston.emitErrs = true;

const fileLogger = new winston.transports.File({
  level: 'info',
  filename: path.resolve(path.join(__dirname, `../../log/server.${process.env.NODE_ENV}.log`)),
  handleExceptions: true,
  json: false,
  maxsize: 5242880, //5MB
  maxFiles: 5,
  colorize: false
});

const consoleLogger = new winston.transports.Console({
  level: 'debug',
  handleExceptions: true,
  json: false,
  colorize: true
});

const logger = new winston.Logger({
  transports: [fileLogger, consoleLogger],
  exitOnError: false
});

export default logger;
export const stream = {
  write: (message) => {
    logger.info(message.toString().trim());
  }
};
