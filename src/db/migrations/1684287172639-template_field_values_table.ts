import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class templateFieldValuesTable1684287172639
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Template_Field_Values',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'field_id',
            isUnique: false,
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'instance_id',
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
    );
    await queryRunner.createForeignKey(
      'Template_Field_Values',
      new TableForeignKey({
        columnNames: ['instance_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Template_Instances',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'Template_Field_Values',
      new TableForeignKey({
        columnNames: ['field_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Template_Fields',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'Template_Field_Values',
      new TableIndex({
        name: 'IDX_template_field_values_field_id',
        columnNames: ['field_id'],
      }),
    );
    await queryRunner.createIndex(
      'Template_Field_Values',
      new TableIndex({
        name: 'IDX_template_field_values_instance_id',
        columnNames: ['instance_id'],
      }),
    );
    await queryRunner.createIndex(
      'Template_Field_Values',
      new TableIndex({
        name: 'IDX_template_field_values_instance_id_field_id',
        columnNames: ['instance_id', 'field_id'],
      }),
    );
    await queryRunner.createIndex(
      'Template_Field_Values',
      new TableIndex({
        name: 'IDX_template_field_values_instance_id_field_id_updated_at',
        columnNames: ['instance_id', 'field_id', 'updated_at'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Template_Field_Values');
  }
}
