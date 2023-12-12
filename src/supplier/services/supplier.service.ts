import { type Logger } from 'pino';
import { LogAware } from 'src/log/log-aware.js';
import { type SupplierMapper } from '../mappers/supplier.mapper.js';
import { type SupplierDto } from '../dtos/supplier.dto.js';
import { type SupplierRepository } from '../repositories/supplier.repository.js';

export class SupplierService extends LogAware {
  constructor(
    private readonly supplierRepository: SupplierRepository,
    private readonly supplierMapper: SupplierMapper,
    logger: Logger
  ) {
    super(logger);
  }

  async getById(id: string): Promise<SupplierDto | null> {
    const supplier = await this.supplierRepository.getById(id);
    if (supplier === null) {
      return null;
    }

    return this.supplierMapper.toDto(supplier);
  }
}
