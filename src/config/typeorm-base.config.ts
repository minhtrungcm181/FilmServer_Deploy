import {SnakeNamingStrategy} from 'typeorm-naming-strategies';
import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const typeOrmBaseConfig: PostgresConnectionOptions = {
  type: 'postgres',
  synchronize: false,
  migrationsRun: false,
  logging: true,
  migrationsTableName: 'sys_migration',
  namingStrategy: new SnakeNamingStrategy(),
};
