import { TableColumn, type MigrationInterface, type QueryRunner, Table } from 'typeorm';

export class CreateSupplier1702372432654 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'supplier',
      columns: [
        new TableColumn({
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid'
        }),
        new TableColumn({
          name: 'name',
          type: 'varchar',
          isNullable: false
        }),
        new TableColumn({
          name: 'created_at',
          type: 'timestamp',
          isNullable: false,
          default: 'now()'
        }),
        new TableColumn({
          name: 'updated_at',
          type: 'timestamp',
          isNullable: false,
          default: 'now()'
        })
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('supplier');
  }
}
