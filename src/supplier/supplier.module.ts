import { type Controller } from 'src/server/controller.js';
import { type Logger } from 'pino';
import { type DataSource } from 'typeorm';
import { type EventBus } from 'src/event/event-bus.js';
import { SupplierRepository } from './repositories/supplier.repository.js';
import { SupplierMapper } from './mappers/supplier.mapper.js';
import { SupplierService } from './services/supplier.service.js';
import { SupplierController } from './controllers/supplier.controller.js';
import { SupplierPersistedEntity } from './entities/supplier.entity.js';

export interface SupplierModule extends Module {
  controllers: Controller[]
};

export function getSupplierModule(
  dataSource: DataSource,
  eventBus: EventBus,
  logger: Logger
): SupplierModule {
  const supplierRepository = new SupplierRepository(dataSource.getRepository(SupplierPersistedEntity), logger);
  const supplierMapper = new SupplierMapper();
  const supplierService = new SupplierService(supplierRepository, supplierMapper, eventBus, logger);

  return {
    controllers: [
      new SupplierController(supplierService, logger)
    ]
  };
}
