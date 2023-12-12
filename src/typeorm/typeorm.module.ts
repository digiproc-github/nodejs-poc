import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { dataSourceConfig } from './typeorm.config.js';

export function getTypeORMModule(): DataSource {
  return new DataSource(dataSourceConfig);
}
