import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { TechnologyEntity } from '../../technology/entity/technology.entity';
import { TemplateEntity } from './template.entity';
import { TemplateInstanceEntity } from './templateInstance.entity';

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
      templateFieldValue.templateInstance,
  )
  templateInstanceId: string;
  @ManyToOne(
    () => TemplateInstanceEntity,
    (templateInstance) => templateInstance.templateValues,
  )
  templateInstance: TemplateInstanceEntity;
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
