import { type Controller } from 'src/server/controller.js';
import { type Logger } from 'pino';
import { type DataSource } from 'typeorm';
import { SupplierRepository } from './repositories/supplier.repository.js';
import { SupplierMapper } from './mappers/supplier.mapper.js';
import { SupplierService } from './services/supplier.service.js';
import { SupplierController } from './controllers/supplier.controller.js';
import { SupplierPersistedEntity } from './entities/supplier.entity.js';

export interface SupplierModule extends Module {
  Controllers: Controller[]
};

export function getSupplierModule(
  dataSource: DataSource,
  logger: Logger
): SupplierModule {
  const supplierRepository = new SupplierRepository(dataSource.getRepository(SupplierPersistedEntity), logger);
  const supplierMapper = new SupplierMapper();
  const supplierService = new SupplierService(supplierRepository, supplierMapper, logger);

  return {
    Controllers: [
      new SupplierController(supplierService, logger)
    ]
  };
}
