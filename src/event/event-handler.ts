import { type Logger } from 'pino';
import { LogAware } from 'src/log/log-aware.js';
import { type EventBus } from './event-bus.js';

export abstract class EventHandler extends LogAware {
  constructor(
    protected readonly eventBus: EventBus,
    logger: Logger
  ) {
    super(logger);
  }

  public abstract listen(): void;
}
