import { type Logger } from 'pino';
import { type Controller } from 'src/server/controller.js';
import { HealthController } from './controllers/health.controller.js';

export interface HealthModule extends Module {
  controllers: Controller[]
}

export function getHealthModule(
  logger: Logger
): HealthModule {
  return {
    controllers: [
      new HealthController(logger)
    ]
  };
}
