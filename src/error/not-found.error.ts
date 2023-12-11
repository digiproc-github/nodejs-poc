import { type ErrorCode, ErrorStatusCode, ErrorWithCode } from './error-with-code.js';

export class NotFoundError extends ErrorWithCode {
  static CODE: ErrorCode = 'common/not-found';

  constructor(code: ErrorCode = NotFoundError.CODE, message: string = 'not found') {
    super(ErrorStatusCode.NOT_FOUND, code, message);
  }
}
