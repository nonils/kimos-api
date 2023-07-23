import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { ApplicationEntity } from '../../application/entity/application.entity';

@Entity()
export class TemplateFieldValueEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    name: 'value',
    type: 'jsonb',
    nullable: false,
  })
  value: string;
  @RelationId(
    (templateFieldValue: TemplateFieldValueEntity) =>
      templateFieldValue.application,
  )
  applicationId: string;
  @ManyToOne(
    () => ApplicationEntity,
    (application) => application.templateValues,
  )
  application: ApplicationEntity;
  @Column({
    name: 'is_deleted',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isDeleted: boolean;

  @Column({
    name: 'created_at',
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
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;
}
