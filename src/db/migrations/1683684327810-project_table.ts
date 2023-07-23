import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class projectTable1683684327810 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Projects',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            isUnique: false,
            type: 'varchar(255)',
            isNullable: false,
          },
          {
            name: 'description',
            isUnique: false,
            type: 'varchar(512)',
            isNullable: true,
          },
          {
            name: 'type',
            isUnique: false,
            type: 'varchar(64)',
            isNullable: false,
            enum: ['PERSONAL', 'ORGANIZATION'],
          },
          {
            name: 'created_by',
            isUnique: false,
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'account_id',
            isUnique: false,
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'organization_id',
            isUnique: false,
            type: 'uuid',
            isNullable: true,
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
      true,
    );
    await queryRunner.createForeignKey(
      'Projects',
      new TableForeignKey({
        columnNames: ['created_by'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Accounts',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'Projects',
      new TableForeignKey({
        columnNames: ['account_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Accounts',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'Projects',
      new TableForeignKey({
        columnNames: ['organization_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Organizations',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'Projects',
      new TableIndex({
        name: 'IDX_projects_organization_id',
        columnNames: ['organization_id'],
      }),
    );
    await queryRunner.createIndex(
      'Projects',
      new TableIndex({
        name: 'IDX_projects_account_id',
        columnNames: ['account_id'],
      }),
    );
    await queryRunner.createIndex(
      'Projects',
      new TableIndex({
        name: 'IDX_projects_type_organization_id',
        columnNames: ['type', 'organization_id'],
      }),
    );
    await queryRunner.createIndex(
      'Projects',
      new TableIndex({
        name: 'IDX_projects_type_account_id',
        columnNames: ['type', 'account_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Projects');
  }
}
