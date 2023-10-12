import * as winston from 'winston';
import 'winston-daily-rotate-file';
import {nestLikeConsoleFormat} from './nest-like-format.logger';

const TIMESTAMP_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

const fileFormat = winston.format.combine(
  winston.format.errors({stack: true}),
  winston.format.metadata(),
  winston.format.splat(),
  winston.format.align(),
  winston.format.timestamp({format: TIMESTAMP_FORMAT}),
  winston.format.printf((info) => {
    if (info?.metadata?.stack) {
      return `${info.timestamp} ${info.level}: ${info.message}\n${info.metadata.stack}`;
    } else {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    }
  }),
);

const errorTransport = new winston.transports.DailyRotateFile({
  level: 'error',
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '30d',
  format: fileFormat,
  handleExceptions: true,
});

const allTransport = new winston.transports.DailyRotateFile({
  level: 'silly',
  filename: 'logs/all-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '100m',
  maxFiles: '7d',
  format: fileFormat,
  handleExceptions: true,
});

const consoleTransport = new winston.transports.Console({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
  format: winston.format.combine(
    winston.format.timestamp({format: TIMESTAMP_FORMAT}),
    winston.format.ms(),
    nestLikeConsoleFormat('Opendata4Gov'),
  ),
  handleExceptions: true,
});

// const logServiceTransport = new LogServiceTransport({});

const winstonLogger = winston.createLogger({
  transports: [consoleTransport, errorTransport, allTransport],
  // transports: [consoleTransport],
});

export default winstonLogger;
