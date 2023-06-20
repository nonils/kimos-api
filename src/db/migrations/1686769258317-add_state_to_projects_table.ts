import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addStateFieldToProjectsTable1686769258317
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Projects',
      new TableColumn({
        name: 'state',
        type: 'varchar(255)',
        isNullable: false,
        default: "'DRAFT'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Projects', 'state');
  }
}
