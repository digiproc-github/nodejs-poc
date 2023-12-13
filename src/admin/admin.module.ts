import { type EventBus } from 'src/event/event-bus.js';
import { type Logger } from 'pino';
import { type EventHandler } from 'src/event/event-handler.js';
import { SupplierEventHandler } from './handlers/supplier-event.handler.js';

export interface AdminModule extends Module {
  eventHandlers: EventHandler[]
}

export function getAdminModule(
  eventBus: EventBus,
  logger: Logger
): AdminModule {
  return {
    eventHandlers: [
      new SupplierEventHandler(eventBus, logger)
    ]
  };
}
