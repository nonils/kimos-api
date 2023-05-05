import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class templateTechnologiesTable1683719883244
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Template_Technologies',
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
            name: 'technology_id',
            isUnique: false,
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'Template_Technologies',
      new TableForeignKey({
        columnNames: ['template_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Templates',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'Template_Technologies',
      new TableForeignKey({
        columnNames: ['technology_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Technologies',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'Template_Technologies',
      new TableIndex({
        name: 'IDX_template_technologies_template_id',
        columnNames: ['template_id'],
      }),
    );
    await queryRunner.createIndex(
      'Template_Technologies',
      new TableIndex({
        name: 'IDX_template_technologies_technology_id',
        columnNames: ['technology_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Template_Technologies');
  }
}
