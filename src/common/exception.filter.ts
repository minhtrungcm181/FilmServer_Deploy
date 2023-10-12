import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {AppError} from 'src/common/app.error';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    this.logger.error('Exception filter error: ', exception.stack, AppExceptionFilter.name);

    if (exception instanceof AppError) {
      response.status(exception.HttpStatusCode).json(exception.JSON);
    } else {
      const statusCode =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      const message = exception.message;
      response.status(statusCode).json({
        statusCode: statusCode,
        errorMessage: message,
      });
    }
  }
}
