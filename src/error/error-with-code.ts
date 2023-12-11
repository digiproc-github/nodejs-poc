/** @description errors to their respective HTTP status codes */
export enum ErrorStatusCode {
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  CONFLICT = 409,
}

export type ErrorDomain = 'common';

/** @description these error codes are publicly available to APIs consumers and have standard format */
export type ErrorCode = `${ErrorDomain}/${string}`;

export class ErrorWithCode extends Error {
  constructor(
    public readonly statusCode: ErrorStatusCode,
    public readonly code: ErrorCode,
    message: string
  ) {
    super(message);

    this.name = this.constructor.name;

    /** @description this is needed to capture additional error fields in loggers */
    Object.defineProperty(this, 'code', {
      enumerable: true,
      writable: false,
      configurable: false,
      value: this.code
    });
    Object.defineProperty(this, 'statusCode', {
      enumerable: true,
      writable: false,
      configurable: false,
      value: this.statusCode
    });
  }
}
