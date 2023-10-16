
import { Film } from '@entities/film.entity';
import {File} from '../entities/file.entity';
import { DataSource, DataSourceOptions } from "typeorm";
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: true,
    entities: [File, Film],
    migrations: ['./src/migrations/*.{ts,js}'],
    migrationsRun: true
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource