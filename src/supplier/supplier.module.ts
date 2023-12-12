import { type Controller } from 'src/server/controller.js';
import { type Logger } from 'pino';
import { SupplierRepository } from './repositories/supplier.repository.js';
import { SupplierMapper } from './mappers/supplier.mapper.js';
import { SupplierService } from './services/supplier.service.js';
import { SupplierController } from './controllers/supplier.controller.js';

export interface SupplierModule extends Module {
  Controllers: Controller[]
};

export function getSupplierModule(
  logger: Logger
): SupplierModule {
  const supplierRepository = new SupplierRepository(logger);
  const supplierMapper = new SupplierMapper();
  const supplierService = new SupplierService(supplierRepository, supplierMapper, logger);

  return {
    Controllers: [
      new SupplierController(supplierService, logger)
    ]
  };
}
