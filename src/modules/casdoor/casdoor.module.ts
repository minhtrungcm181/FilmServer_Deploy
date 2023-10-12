import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {CasdoorService} from './casdoor.service';

@Module({
  providers: [CasdoorService],
  exports: [CasdoorService],
  imports: [ConfigModule],
})
export class CasdoorModule {}
