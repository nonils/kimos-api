import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class cloudProviderTable1684120469061 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Cloud_Providers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            isUnique: false,
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'logo',
            isUnique: false,
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'url',
            isUnique: false,
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'is_deleted',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Cloud_Providers');
  }
}
