import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class templateInstanceTable1683774299824 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Template_Instances',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'template_id',
            isUnique: false,
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'account_id',
            isUnique: false,
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'organization_id',
            isUnique: false,
            type: 'uuid',
            isNullable: true,
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
      'Template_Instances',
      new TableForeignKey({
        columnNames: ['template_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Templates',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'Template_Instances',
      new TableForeignKey({
        columnNames: ['account_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Accounts',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'Template_Instances',
      new TableForeignKey({
        columnNames: ['organization_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Organizations',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'Template_Instances',
      new TableForeignKey({
        columnNames: ['created_by'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Accounts',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'Template_Instances',
      new TableIndex({
        name: 'IDX_template_instances_template_id',
        columnNames: ['template_id'],
      }),
    );
    await queryRunner.createIndex(
      'Template_Instances',
      new TableIndex({
        name: 'IDX_template_instances_account_id',
        columnNames: ['account_id'],
      }),
    );
    await queryRunner.createIndex(
      'Template_Instances',
      new TableIndex({
        name: 'IDX_template_instances_organization_id',
        columnNames: ['organization_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Template_Instances');
  }
}
