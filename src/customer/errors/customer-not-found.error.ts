import { type ErrorCode } from 'src/error/error-with-code.js';
import { NotFoundError } from 'src/error/not-found.error.js';

export class CustomerNotFoundError extends NotFoundError {
  static CODE: ErrorCode = 'customer/not-found';

  constructor() {
    super(CustomerNotFoundError.CODE, 'Customer not found');
  }
}
