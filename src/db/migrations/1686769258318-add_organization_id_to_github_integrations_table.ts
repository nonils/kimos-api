import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class addOrganizationIdFieldAndRemoveNotNullFromAccountIdToGithubIntegrationTable1686769258318
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Github_Integrations',
      new TableColumn({
        name: 'organization_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'Github_Integrations',
      new TableForeignKey({
        columnNames: ['organization_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Organizations',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.query(
      `ALTER TABLE "Github_Integrations" ALTER COLUMN "account_id" DROP NOT NULL `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Github_Integrations" ALTER COLUMN "account_id" SET NOT NULL `,
    );
    await queryRunner.dropColumn('Github_Integrations', 'organization_id');
  }
}
