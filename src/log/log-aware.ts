import { type Logger } from 'pino';

export abstract class LogAware {
  constructor(protected readonly logger: Logger) {
    this.logger = logger.child({
      name: this.constructor.name
    });
  }
}
