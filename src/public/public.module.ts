import {Logger, Module} from '@nestjs/common';

import {PublicController} from './public.controller';
import {PublicService} from './public.service';

@Module({
  providers: [Logger, PublicService],
  controllers: [PublicController],
})
export class PublicModule {}
