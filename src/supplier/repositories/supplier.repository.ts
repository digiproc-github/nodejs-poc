import { LogAware } from 'src/log/log-aware.js';
import { type Repository } from 'typeorm';
import { type Logger } from 'pino';
import { type Creatable } from 'src/common/entities/abstract-entity.js';
import { type SupplierEntity, type SupplierPersistedEntity } from '../entities/supplier.entity.js';

export class SupplierRepository extends LogAware {
  constructor(
    private readonly supplierRepository: Repository<SupplierPersistedEntity>,
    logger: Logger
  ) {
    super(logger);
  }

  async getById(id: string): Promise<SupplierEntity | null> {
    const supplier = await this.supplierRepository.findOne({
      where: { id }
    });

    return supplier;
  }

  async create(supplier: Creatable<SupplierEntity>): Promise<SupplierEntity> {
    const entity = this.supplierRepository.create(supplier);
    return await this.supplierRepository.save(entity);
  }
}
