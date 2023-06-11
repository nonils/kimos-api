import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addTemplateImageUrlToTemplates1684950377932
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Templates',
      new TableColumn({
        name: 'template_image_url',
        type: 'varchar(512)',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Templates', 'template_image_url');
  }
}
