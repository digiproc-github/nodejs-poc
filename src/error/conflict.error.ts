import { type ErrorCode, ErrorStatusCode, ErrorWithCode } from './error-with-code.js';

export class ConflictError extends ErrorWithCode {
  static CODE: ErrorCode = 'common/conflict';

  constructor(code: ErrorCode = ConflictError.CODE, message: string = 'conflict') {
    super(ErrorStatusCode.CONFLICT, code, message);
  }
}
