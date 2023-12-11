import { LogAware } from 'src/log/log-aware.js';
import { type CustomerDto } from '../dtos/customer.dto.js';

export class CustomerService extends LogAware {
  async getById(id: string): Promise<CustomerDto | null> {
    throw new Error(`Get ${id}: Method not implemented.`);
  }
}
