import { type Logger } from 'pino';
import { type Controller } from 'src/server/controller.js';
import { CustomerController } from './controllers/customer.controller.js';
import { CustomerService } from './services/customer.service.js';

export interface CostumerModule extends Module {
  Controllers: Controller[]
}

export function getCustomerModule(
  logger: Logger
): CostumerModule {
  const customerService = new CustomerService(logger);

  return {
    Controllers: [
      new CustomerController(customerService, logger)
    ]
  };
}
