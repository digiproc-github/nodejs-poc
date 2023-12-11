import { LogAware } from 'src/log/log-aware.js';
import { type WordpressClient } from 'src/wordpress/clients/wordpress.client.js';
import { type Logger } from 'pino';
import { CurrencyCode } from 'src/common/enum/currency-code.enum.js';
import { type CustomerEntity } from '../entities/customer.entity.js';

export class CustomerRepository extends LogAware {
  constructor(
    private readonly wordpressClient: WordpressClient,
    logger: Logger
  ) {
    super(logger);
  }

  async getById(id: string): Promise<CustomerEntity | null> {
    const rawEntity = await this.wordpressClient.getCustomer(id);
    if (rawEntity === null) {
      return null;
    }

    if (rawEntity.name === null ||
      rawEntity.currency === null) {
      this.logger.error({ rawEntity }, 'nullish values returned from client');
      throw new Error('nullish values');
    }

    return {
      id: rawEntity.id,
      fullName: rawEntity.name,
      currency: CurrencyCode[rawEntity.currency.toUpperCase() as CurrencyCode],
      businessRegistration: rawEntity.businessRegistrationNumber ?? undefined,
      createdAt: new Date(rawEntity.date)
    };
  }
}
