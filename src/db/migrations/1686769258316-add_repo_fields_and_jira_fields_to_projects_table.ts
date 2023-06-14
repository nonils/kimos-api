import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addRepoFieldsAndJiraFieldsToProjectsTable1686769258316
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Projects',
      new TableColumn({
        name: 'repository_name',
        type: 'varchar(255)',
        isNullable: false,
      }),
    );
    await queryRunner.addColumn(
      'Projects',
      new TableColumn({
        name: 'repository_id',
        type: 'varchar(255)',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'Projects',
      new TableColumn({
        name: 'repository_url',
        type: 'varchar(255)',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'Projects',
      new TableColumn({
        name: 'jira_project_id',
        type: 'varchar(255)',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'Projects',
      new TableColumn({
        name: 'jira_project_key',
        type: 'varchar(255)',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'Projects',
      new TableColumn({
        name: 'jira_project_name',
        type: 'varchar(255)',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'Projects',
      new TableColumn({
        name: 'is_private_repo',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
    );
    await queryRunner.addColumn(
      'Projects',
      new TableColumn({
        name: 'allows_jira_integration',
        type: 'boolean',
        isNullable: false,
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Projects', 'repository_name');
    await queryRunner.dropColumn('Projects', 'repository_id');
    await queryRunner.dropColumn('Projects', 'repository_url');
    await queryRunner.dropColumn('Projects', 'jira_project_id');
    await queryRunner.dropColumn('Projects', 'jira_project_key');
    await queryRunner.dropColumn('Projects', 'jira_project_name');
    await queryRunner.dropColumn('Projects', 'is_private_repo');
    await queryRunner.dropColumn('Projects', 'allows_jira_integration');
  }
}
