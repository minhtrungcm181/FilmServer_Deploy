import {ErrorCode} from './error-code';

export interface ErrorResponse {
  statusCode: number;
  errorCode: ErrorCode;
  errorMessage: string;
}
