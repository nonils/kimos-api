import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addDeletedAtToGithubIntegrationTable1686769258319
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Github_Integrations',
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Github_Integrations', 'deleted_at');
  }
}
