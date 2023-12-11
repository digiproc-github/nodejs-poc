import { type Logger, pino } from 'pino';
import loggerConfig from './logger.config.js';

export function getLogger(): Logger {
  return pino(loggerConfig);
}
