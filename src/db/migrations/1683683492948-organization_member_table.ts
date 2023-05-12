import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class organizationMemberTable1683683492948
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Organization_Members',
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
            isUnique: false,
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'organization_id',
            isUnique: false,
            type: 'uuid',
            isNullable: false,
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

    await queryRunner.createForeignKey(
      'Organization_Members',
      new TableForeignKey({
        columnNames: ['account_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Accounts',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'Organization_Members',
      new TableForeignKey({
        columnNames: ['organization_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Organizations',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'Organization_Members',
      new TableIndex({
        name: 'IDX_organization_members_organization_id',
        columnNames: ['organization_id'],
      }),
    );
    await queryRunner.createIndex(
      'Organization_Members',
      new TableIndex({
        name: 'IDX_organization_members_account_id',
        columnNames: ['account_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Organization_Members');
  }
}
