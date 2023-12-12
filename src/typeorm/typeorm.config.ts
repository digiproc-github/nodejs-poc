import { type DataSourceOptions } from 'typeorm';

const isDev = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: process.env.POSTGRES_PORT !== undefined ? +process.env.POSTGRES_PORT : 5432,
  username: process.env.POSTGRES_USERNAME ?? 'digiproc',
  password: process.env.POSTGRES_PASSWORD ?? 'secret',
  database: process.env.POSTGRES_DATABASE ?? 'digiproc',
  entities: ['./**/entities/*.ts'],
  migrations: ['./**/migrations/**/*.ts'],
  migrationsTableName: 'migrations',
  migrationsRun: isDev,
  logging: isDev,
  synchronize: false
};
