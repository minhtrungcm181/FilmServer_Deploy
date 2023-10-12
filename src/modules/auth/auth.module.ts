import {CasdoorModule} from '@modules/casdoor/casdoor.module';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {APP_GUARD} from '@nestjs/core';
import {AuthGuard} from './auth.guard';

@Module({
  imports: [CasdoorModule, ConfigModule],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthGuard,
  //   },
  // ],
})
export class AuthModule {}
