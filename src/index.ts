import { Server } from './server/server.js';
import { getLogger } from './log/logger.module.js';
import { getFastify } from './fastify/fastify.module.js';
import { getHealthModule } from './health/health.module.js';
import { getCustomerModule } from './customer/customer.module.js';
import { getWordpressModule } from './wordpress/wordpress.module.js';
import { getSupplierModule } from './supplier/supplier.module.js';
import { getTypeORMModule } from './typeorm/typeorm.module.js';
import { getEventBusModule } from './event/event.module.js';
import { getAdminModule } from './admin/admin.module.js';

const logger = getLogger();

process.on('uncaughtException', (err) => {
  logger.error({ err }, 'uncaughtException');
}).on('unhandledRejection', (err) => {
  logger.error({ err }, 'unhandledRejection');
});

try {
  logger.info('initializing TypeORM and DB connection');
  const dataSource = getTypeORMModule();
  await dataSource.initialize();

  logger.info('initializing modules and resolving dependencies');
  const { services: { inMemoryEventBus } } = getEventBusModule(logger);
  const healthModule = getHealthModule(logger);
  const { wordPressClient } = getWordpressModule();
  const { eventHandlers } = getAdminModule(inMemoryEventBus, logger);
  const customerModule = getCustomerModule(wordPressClient, logger);
  const supplierModule = getSupplierModule(dataSource, inMemoryEventBus, logger);

  eventHandlers.forEach((eventHandler) => {
    eventHandler.listen();
  });

  const server = new Server(
    getFastify(),
    [
      ...healthModule.controllers,
      ...customerModule.controllers,
      ...supplierModule.controllers
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
