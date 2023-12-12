import { Server } from './server/server.js';
import { getLogger } from './log/logger.module.js';
import { getFastify } from './fastify/fastify.module.js';
import { getHealthModule } from './health/health.module.js';
import { getCustomerModule } from './customer/customer.module.js';
import { getWordpressModule } from './wordpress/wordpress.module.js';
import { getSupplierModule } from './supplier/supplier.module.js';

const logger = getLogger();

process.on('uncaughtException', (err) => {
  logger.error({ err }, 'uncaughtException');
}).on('unhandledRejection', (err) => {
  logger.error({ err }, 'unhandledRejection');
});

try {
  logger.info('initializing modules and resolving dependencies');
  const healthModule = getHealthModule(logger);
  const { Client: wordpressClient } = getWordpressModule();
  const customerModule = getCustomerModule(wordpressClient, logger);
  const supplierModule = getSupplierModule(logger);

  const server = new Server(
    getFastify(),
    [
      ...healthModule.Controllers,
      ...customerModule.Controllers,
      ...supplierModule.Controllers
    ],
    logger
  );

  logger.info('starting the server');
  await server.start();
  logger.info('server started');

  function gracefulShutDown(): void {
    Promise.resolve().then(async () => {
      logger.info('stopping the server');
      await server.stop();
    }).catch((err) => {
      logger.error({ err }, 'error graceful shutdown');
    });
  }

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received, performing graceful shutdown');
    gracefulShutDown();
  }).on('SIGINT', () => {
    logger.info('SIGINT received, performing graceful shutdown');
    gracefulShutDown();
  });
} catch (err) {
  logger.fatal({ err }, 'error during bootstrap');
  process.exit(1);
}
