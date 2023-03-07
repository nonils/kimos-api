import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class initialSchema1678164157979 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.createTable(
      new Table({
        name: 'github_integration',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'account_id',
            type: 'varchar(64)',
            isNullable: false,
          },
          {
            name: 'github_installation_id',
            type: 'varchar(64)',
            isNullable: false,
          },
          {
            name: 'target_type',
            type: 'varchar(32)',
            isNullable: false,
          },
          {
            name: 'target_id',
            type: 'varchar(64)',
            isNullable: false,
          },
          {
            name: 'github_account_login',
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'is_deleted',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'last_github_updated',
            type: 'timestamp',
            default: 'now()',
            isNullable: true,
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
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // const table = await queryRunner.getTable("answer")
    // const foreignKey = table.foreignKeys.find(
    //   (fk) => fk.columnNames.indexOf("questionId") !== -1,
    // )
    // await queryRunner.dropForeignKey("answer", foreignKey)
    // await queryRunner.dropColumn("answer", "questionId")
    // await queryRunner.dropTable("answer")
    // await queryRunner.dropIndex("question", "IDX_QUESTION_NAME")
    // await queryRunner.dropTable("question")
  }
}
