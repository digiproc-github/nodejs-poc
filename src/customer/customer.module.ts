import { type Logger } from 'pino';
import { type Controller } from 'src/server/controller.js';
import { type WordpressClient } from 'src/wordpress/clients/wordpress.client.js';
import { CustomerController } from './controllers/customer.controller.js';
import { CustomerService } from './services/customer.service.js';
import { CustomerRepository } from './repositories/customer.repository.js';

export interface CostumerModule extends Module {
  controllers: Controller[]
}

export function getCustomerModule(
  wordpressClient: WordpressClient,
  logger: Logger
): CostumerModule {
  const customerRepository = new CustomerRepository(wordpressClient, logger);
  const customerService = new CustomerService(customerRepository, logger);

  return {
    controllers: [
      new CustomerController(customerService, logger)
    ]
  };
}
