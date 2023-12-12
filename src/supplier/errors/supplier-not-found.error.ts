import { type ErrorCode } from 'src/error/error-with-code.js';
import { NotFoundError } from 'src/error/not-found.error.js';

export class SupplierNotFoundError extends NotFoundError {
  static CODE: ErrorCode = 'supplier/not-found';

  constructor() {
    super(SupplierNotFoundError.CODE, 'Supplier not found');
  }
}
