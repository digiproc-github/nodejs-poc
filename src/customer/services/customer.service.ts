import { LogAware } from 'src/log/log-aware.js';
import { type Logger } from 'pino';
import { ResponseType } from 'src/common/dtos/response.dto.js';
import { type CustomerDto } from '../dtos/customer.dto.js';
import { type CustomerRepository } from '../repositories/customer.repository.js';

export class CustomerService extends LogAware {
  constructor(
    private readonly repository: CustomerRepository,
    logger: Logger
  ) {
    super(logger);
  }

  async getById(id: string): Promise<CustomerDto | null> {
    const rawEntity = await this.repository.getById(id);
    if (rawEntity === null) {
      return null;
    }

    return {
      id: rawEntity.id,
      type: ResponseType.CUSTOMER,
      attributes: {
        fullName: rawEntity.fullName,
        currency: rawEntity.currency,
        businessRegistration: rawEntity.businessRegistration,
        createdAt: rawEntity.createdAt.toISOString()
      },
      links: {
        registration: `/customer/${rawEntity.id}`
      }
    };
  }
}
