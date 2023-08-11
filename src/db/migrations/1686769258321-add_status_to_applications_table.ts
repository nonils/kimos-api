import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addDeletedAtToGithubIntegrationTable1686769258321
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Applications',
      new TableColumn({
        name: 'status',
        type: 'varchar',
        isNullable: false,
        default: "'WAITING FOR INTEGRATIONS'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Applications', 'status');
  }
}
