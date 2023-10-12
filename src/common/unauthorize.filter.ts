import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

@Catch(HttpException)
export class UnauthorizeFilter implements ExceptionFilter {
  constructor(private config: ConfigService) {}
  catch(_: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const clientUrl = this.config.get<string>('CLIENT_URL') + '/auth';

    response.status(HttpStatus.UNAUTHORIZED).redirect(clientUrl);
  }
}
