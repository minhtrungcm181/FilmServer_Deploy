import { DataSource } from "typeorm";
import { dataSourceOptions } from "./data-source";

const datasource = new DataSource(dataSourceOptions); // config is one that is defined in datasource.config.ts file
datasource.initialize();
export default datasource;