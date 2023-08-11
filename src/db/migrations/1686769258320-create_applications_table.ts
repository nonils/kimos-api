import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class createApplicationsTable1686769258320
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Applications',
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
            name: 'is_private_repo',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'repository_name',
            isUnique: false,
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'allows_jira_integration',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'jira_project_name',
            isUnique: false,
            type: 'varchar(255)',
            isNullable: true,
          },
          {
            name: 'jira_key',
            isUnique: false,
            type: 'varchar(30)',
            isNullable: true,
          },
          {
            name: 'project_id',
            isUnique: false,
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'template_implementation_id',
            isUnique: false,
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_by',
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
      'Applications',
      new TableForeignKey({
        columnNames: ['project_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Projects',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'Applications',
      new TableForeignKey({
        columnNames: ['template_implementation_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Template_Implementations',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'Applications',
      new TableForeignKey({
        columnNames: ['created_by'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Accounts',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createIndex(
      'Applications',
      new TableIndex({
        name: 'IDX_applications_project_id',
        columnNames: ['project_id'],
      }),
    );
    await queryRunner.createIndex(
      'Applications',
      new TableIndex({
        name: 'IDX_applications_created_by_id',
        columnNames: ['created_by'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Applications');
  }
}
