import { Type } from '@sinclair/typebox';
import { IdSchema } from 'src/common/schemas.js';
import { ConflictError } from 'src/error/conflict.error.js';
import { ErrorSchema } from 'src/error/error-schema.js';
import { type ErrorCode } from 'src/error/error-with-code.js';

export const CustomerConflictErrorSchema = Type.Object({
  ...ErrorSchema.properties,
  conflictId: IdSchema
});

export class CustomerConflictError extends ConflictError {
  static CODE: ErrorCode = 'customer/conflict';

  constructor(
    public readonly conflictId: string
  ) {
    super(CustomerConflictError.CODE, 'Customer exists');
  }
}
