import { type ErrorCode, ErrorStatusCode, ErrorWithCode } from './error-with-code.js';

export class BadRequestError extends ErrorWithCode {
  static CODE: ErrorCode = 'common/bad-request';

  constructor(code: ErrorCode = BadRequestError.CODE, message: string = 'bad request') {
    super(ErrorStatusCode.BAD_REQUEST, code, message);
  }
}
