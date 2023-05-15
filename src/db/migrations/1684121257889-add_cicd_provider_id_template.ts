import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addCicdProviderIdTemplate1684121257889
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Templates',
      new TableColumn({
        name: 'cicd_provider_id',
        type: 'uuid',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
