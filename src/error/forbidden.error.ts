import { type ErrorCode, ErrorStatusCode, ErrorWithCode } from './error-with-code.js';

export class ForbiddenError extends ErrorWithCode {
  static CODE: ErrorCode = 'common/forbidden';

  constructor(code: ErrorCode = ForbiddenError.CODE, message: string = 'forbidden') {
    super(ErrorStatusCode.FORBIDDEN, code, message);
  }
}
