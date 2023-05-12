import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class initialSchema1678164157979 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.createTable(
      new Table({
        name: 'Accounts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'email',
            isUnique: true,
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'last_name',
            type: 'varchar(256)',
            isNullable: true,
          },
          {
            name: 'pronouns',
            type: 'varchar(32)',
            isNullable: true,
          },
          {
            name: 'external_id',
            type: 'varchar(64)',
            isNullable: false,
          },
          {
            name: 'image_url',
            type: 'varchar(256)',
            isNullable: true,
          },
          {
            name: 'bio',
            type: 'varchar(512)',
            isNullable: true,
          },
          {
            name: 'last_login',
            type: 'timestamp',
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
    await queryRunner.createIndex(
      'Accounts',
      new TableIndex({
        name: 'IDX_account_external_id',
        columnNames: ['external_id'],
      }),
    );
    await queryRunner.createIndex(
      'Accounts',
      new TableIndex({
        name: 'IDX_account_email',
        columnNames: ['email'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Accounts');
  }
}
