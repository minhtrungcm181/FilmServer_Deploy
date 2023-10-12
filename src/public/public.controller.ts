import {Controller, Get, Logger} from '@nestjs/common';

@Controller('')
export class PublicController {
  constructor(private readonly logger: Logger) {}

  @Get(['', 'home'])
  home(): string {
    return 'Opendata4Gov API';
  }

  @Get('version')
  version(): string {
    return 'v0.1';
  }

  @Get('test')
  test() {
    this.logger.log('Calling getHello()', PublicController.name);
    this.logger.debug('Calling getHello()', PublicController.name);
    this.logger.verbose('Calling getHello()', PublicController.name);
    this.logger.warn('Calling getHello()', PublicController.name);

    try {
      throw new Error();
    } catch (e) {
      this.logger.error('Calling getHello()', e.stack, PublicController.name);
    }

    return {
      date: new Date(),
    };
    // throw new AppError(400, null, 'bla bla');
  }
}
