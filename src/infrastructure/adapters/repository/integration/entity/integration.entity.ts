import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IntegrationType } from '../../../../../domain/models/IntegrationType';

@Entity('Integrations')
export class IntegrationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    name: 'name',
    unique: false,
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;
  @Column({
    name: 'name',
    unique: false,
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  description: string;
  @Column({
    name: 'type',
    type: 'enum',
    enum: IntegrationType,
    nullable: false,
  })
  type: IntegrationType;
  @Column({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'now()',
  })
  createdAt: Date;
  @Column({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'now()',
  })
  updatedAt: Date;
  @Column({
    name: 'is_deleted',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isDeleted: boolean;
  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;
}
