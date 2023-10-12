import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm';
import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';

import {typeOrmBaseConfig} from './typeorm-base.config';

@Injectable()
export class TypeOrmConnectionsFactory implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      ...typeOrmBaseConfig,

      autoLoadEntities: true,

      synchronize: false,
      migrationsRun: this.configService.get('NODE_ENV') === 'production' ? true : false,

      logging: this.configService.get('NODE_ENV') === 'production' ? ['error', 'schema'] : 'all',
      logger: 'advanced-console',

      // entities: ['dist/**/entities/**/*.entity{.ts,.js}', '/app/**/entities/**/*.entity.js'],
      migrations: ['/app/**/migrations/**/*.js'],

      host: this.configService.get('DB_HOST'),
      port: +this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
    } as PostgresConnectionOptions;
  }
}
