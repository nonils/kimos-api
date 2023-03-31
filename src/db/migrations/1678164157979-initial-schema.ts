import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

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
    await queryRunner.createTable(
      new Table({
        name: 'Github_Integrations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'account_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'github_installation_id',
            type: 'varchar(64)',
            isNullable: false,
          },
          {
            name: 'target_type',
            type: 'varchar(32)',
            isNullable: false,
          },
          {
            name: 'target_id',
            type: 'varchar(64)',
            isNullable: false,
          },
          {
            name: 'github_account_login',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'is_deleted',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'last_github_updated',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
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
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'Github_Integrations',
      new TableForeignKey({
        columnNames: ['account_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Accounts',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createIndex(
      'Github_Integrations',
      new TableIndex({
        name: 'IDX_github_integration_account_id',
        columnNames: ['account_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Github_Integrations');
    await queryRunner.dropTable('Accounts');
  }
}
