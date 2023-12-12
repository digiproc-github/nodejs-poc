import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { type AbstractEntity } from './abstract-entity.js';

export abstract class AbstractPersistedEntity implements AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt!: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt!: Date;
}
