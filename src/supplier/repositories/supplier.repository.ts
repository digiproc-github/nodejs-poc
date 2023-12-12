import { LogAware } from 'src/log/log-aware.js';
import { type SupplierEntity } from '../entities/supplier.entity.js';

export class SupplierRepository extends LogAware {
  async getById(id: string): Promise<SupplierEntity | null> {
    return {
      id,
      name: 'test supplier',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}
