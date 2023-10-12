import {AuthModule} from '@modules/auth/auth.module';
import {CasdoorModule} from '@modules/casdoor/casdoor.module';
import {FileModule} from '@modules/file/file.module';
import {Logger, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {APP_FILTER, APP_PIPE} from '@nestjs/core';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppService} from './app.service';
import {AppExceptionFilter} from './common/exception.filter';
import {appValidationPipe} from './common/validation.pipe';
import {TypeOrmConnectionsFactory} from './config/typeorm-connection.factory';
import {PublicModule} from './public/public.module';
import {AppController} from '@app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [],
      useClass: TypeOrmConnectionsFactory,
    }),

    PublicModule,
    AuthModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useFactory: appValidationPipe,
    },
    Logger,
    AppService,
  ],
})
export class AppModule {}
