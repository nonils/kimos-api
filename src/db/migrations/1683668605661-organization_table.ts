import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class organizationTable1683668605661 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Organizations',
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
            name: 'image_url',
            isUnique: false,
            type: 'varchar(512)',
            isNullable: true,
          },
          {
            name: 'url',
            isUnique: false,
            type: 'varchar(512)',
            isNullable: true,
          },
          {
            name: 'billing_email',
            isUnique: false,
            type: 'varchar(512)',
            isNullable: false,
          },
          {
            name: 'email',
            isUnique: false,
            type: 'varchar(512)',
            isNullable: true,
          },
          {
            name: 'owner_id',
            isUnique: false,
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'plan',
            isUnique: false,
            type: 'varchar(100)',
            isNullable: false,
            enum: ['FREE', 'BASIC', 'PRO', 'ENTERPRISE'],
            default: `'FREE'`,
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
      'Organizations',
      new TableForeignKey({
        columnNames: ['owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Accounts',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'Organizations',
      new TableIndex({
        name: 'IDX_organization_owner_id',
        columnNames: ['owner_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Organizations');
  }
}
