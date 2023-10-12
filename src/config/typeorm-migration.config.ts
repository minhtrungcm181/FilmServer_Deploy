import {DataSource} from 'typeorm';
import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {typeOrmBaseConfig} from './typeorm-base.config';

const migrationConfig: PostgresConnectionOptions = {
  ...typeOrmBaseConfig,

  entities: ['src/**/entities/*.entity{.ts,.js}'],
  migrations: ['src/**/migrations/**/*{.ts,.js}'],

  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const datasource = new DataSource(migrationConfig);
export default datasource;
