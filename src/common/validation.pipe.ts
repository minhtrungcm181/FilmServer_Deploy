import {HttpStatus, ValidationPipe} from '@nestjs/common';
import {AppError} from './app.error';
import {ErrorCode} from './error-code';

export const appValidationPipe = () =>
  new ValidationPipe({
    exceptionFactory(errors) {
      const message = [].concat(...errors.map((item) => Object.values(item.constraints || {})));
      return new AppError(HttpStatus.BAD_REQUEST, ErrorCode.BAD_REQUEST, message);
    },
  });
