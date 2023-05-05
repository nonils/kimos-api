import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class templateFieldsTable1683720276327 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Template_Fields',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'field_type',
            isUnique: false,
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'field_label',
            isUnique: false,
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'field_placeholder',
            isUnique: false,
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'is_required',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'template_id',
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
      'Template_Fields',
      new TableForeignKey({
        columnNames: ['template_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Templates',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'Template_Fields',
      new TableIndex({
        name: 'IDX_template_fields_template_id',
        columnNames: ['template_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Template_Fields');
  }
}
