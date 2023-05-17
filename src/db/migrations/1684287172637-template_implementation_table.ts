import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableForeignKey,
} from 'typeorm';

export class templateImplementationTable1684287172637
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Template_Implementations',
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
            name: 'ci_cd_provider_id',
            isUnique: false,
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'code_version_manager_provider_id',
            isUnique: false,
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'cloud_provider_id',
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
      'Template_Implementations',
      new TableForeignKey({
        columnNames: ['template_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Templates',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'Template_Implementations',
      new TableForeignKey({
        columnNames: ['ci_cd_provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'CI_CD_Providers',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'Template_Implementations',
      new TableForeignKey({
        columnNames: ['code_version_manager_provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Code_Version_Manager_Providers',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'Template_Implementations',
      new TableForeignKey({
        columnNames: ['cloud_provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Cloud_Providers',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createIndex(
      'Template_Implementations',
      new TableIndex({
        name: 'IDX_template_implementations_cloud_provider_id',
        columnNames: ['cloud_provider_id'],
      }),
    );
    await queryRunner.createIndex(
      'Template_Implementations',
      new TableIndex({
        name: 'IDX_template_implementations_ci_cd_provider_id',
        columnNames: ['ci_cd_provider_id'],
      }),
    );
    await queryRunner.createIndex(
      'Template_Implementations',
      new TableIndex({
        name: 'IDX_template_implementations_code_version_manager_provider_id',
        columnNames: ['code_version_manager_provider_id'],
      }),
    );
    await queryRunner.createIndex(
      'Template_Implementations',
      new TableIndex({
        name: 'IDX_template_implementations_multiple_idx',
        columnNames: [
          'ci_cd_provider_id',
          'code_version_manager_provider_id',
          'cloud_provider_id',
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(
      'Template_Implementations',
      'IDX_template_implementations_multiple_idx',
    );
    await queryRunner.dropIndex(
      'Template_Implementations',
      'IDX_template_implementations_code_version_manager_provider_id',
    );
    await queryRunner.dropIndex(
      'Template_Implementations',
      'IDX_template_implementations_ci_cd_provider_id',
    );
    await queryRunner.dropIndex(
      'Template_Implementations',
      'IDX_template_implementations_cloud_provider_id',
    );
    await queryRunner.dropForeignKey(
      'Template_Implementations',
      'FK_template_implementations_cloud_provider_id',
    );
    await queryRunner.dropForeignKey(
      'Template_Implementations',
      'FK_template_implementations_code_version_manager_provider_id',
    );
    await queryRunner.dropForeignKey(
      'Template_Implementations',
      'FK_template_implementations_ci_cd_provider_id',
    );
    await queryRunner.dropForeignKey(
      'Template_Implementations',
      'FK_template_implementations_template_id',
    );
    await queryRunner.dropTable('Template_Implementations');
  }
}
