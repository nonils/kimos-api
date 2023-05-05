import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class technologyTable1683685383713 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Technologies',
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
            name: 'description',
            isUnique: false,
            type: 'varchar(512)',
            isNullable: true,
          },
          {
            name: 'type',
            isUnique: false,
            type: 'varchar(64)',
            isNullable: false,
            enum: [
              'FRONTEND',
              'BACKEND',
              'MOBILE',
              'DATABASE',
              'DEVOPS',
              'TESTING',
              'LIBRARY',
              'DATA',
              'OTHER',
            ],
            default: `'OTHER'`,
          },
          {
            name: 'account_id',
            isUnique: false,
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'organization_id',
            isUnique: false,
            type: 'varchar(100)',
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
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Technologies');
  }
}
