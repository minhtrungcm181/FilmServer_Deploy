import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Catch(HttpException)
export class UnvalidUpload implements ExceptionFilter {
    constructor(private config: ConfigService) { }
    catch(_: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        response.status(HttpStatus.NOT_ACCEPTABLE);
    }
}
