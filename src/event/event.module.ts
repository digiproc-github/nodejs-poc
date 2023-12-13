import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import Emittery from 'emittery';
import { type Logger } from 'pino';
import { EventBus } from './event-bus.js';

export interface EventBusModule extends Module {
  services: {
    inMemoryEventBus: EventBus
  }
}

export function getEventBusModule(logger: Logger): EventBusModule {
  /**
   * @description Ajv default export is wrongly declared for ESM
   */
  // eslint-disable-next-line new-cap
  const ajv = new Ajv.default();
  addFormats.default(ajv);

  const emitter = new Emittery();

  return {
    services: {
      inMemoryEventBus: new EventBus(ajv, emitter, logger)
    }
  };
}
