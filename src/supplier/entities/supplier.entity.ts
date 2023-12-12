import { type AbstractEntity } from 'src/common/entities/abstract-entity.js';
import { AbstractPersistedEntity } from 'src/common/entities/abstract-persisted-entity.js';
import { Column, Entity } from 'typeorm';

export interface SupplierEntity extends AbstractEntity {
  name: string
}

@Entity('supplier')
export class SupplierPersistedEntity extends AbstractPersistedEntity implements SupplierEntity {
  @Column({ type: 'varchar' })
    name!: string;
}
