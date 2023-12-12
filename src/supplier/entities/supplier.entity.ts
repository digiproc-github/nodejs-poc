import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('supplier')
export class SupplierEntity {
  @PrimaryColumn({ type: 'uuid' })
    id!: string;

  @Column({ type: 'varchar' })
    name!: string;

  @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;
}
