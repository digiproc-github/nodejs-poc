import { type Controller } from 'src/server/controller.js';
import { type Logger } from 'pino';

export interface SupplierModule extends Module {
  Controllers: Controller[]
};

export function getSupplierModule(
  logger: Logger
): SupplierModule {
  return {
    Controllers: []
  };
}
