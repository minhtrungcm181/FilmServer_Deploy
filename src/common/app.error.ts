import {ErrorCode} from './error-code';

export class AppError extends Error {
  private statusCode: number;
  private errorCode: ErrorCode;
  private errorMessage: string | string[];

  constructor(statusCode: number, errorCode: ErrorCode, errorMessage?: string | string[]) {
    super(errorMessage.toString());
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }

  get HttpStatusCode() {
    return this.statusCode;
  }

  get JSON() {
    return {
      statusCode: this.statusCode,
      errorCode: this.errorCode,
      errorMessage: this.errorMessage,
    };
  }
}
