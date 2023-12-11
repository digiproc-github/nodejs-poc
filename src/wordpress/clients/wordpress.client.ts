import { RequestError, type Got } from 'got';
import { type CustomerDto } from '../dtos/customer.dto.js';

export class WordpressClient {
  constructor(
    private readonly got: Got
  ) {}

  private is404(err: unknown): boolean {
    if (err instanceof RequestError) {
      return err.response?.statusCode === 404;
    }

    return false;
  }

  public async getCustomer(id: string): Promise<CustomerDto | null> {
    try {
      const { body } = await this.got.get<CustomerDto>(`wp-admin/customers/${id}`);
      return body;
    } catch (err) {
      if (this.is404(err)) {
        return null;
      }

      throw err;
    }
  }
}
