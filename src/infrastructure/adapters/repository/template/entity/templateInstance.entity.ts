import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TemplateImplementationEntity } from './templateImplementation.entity';
import { ProjectEntity } from '../../project/entity/project.entity';
import { TemplateFieldValueEntity } from './templateFieldValue.entity';

@Entity()
export class TemplateInstanceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => TemplateImplementationEntity)
  templateImplementationId: TemplateImplementationEntity;
  @ManyToOne(() => ProjectEntity, (project) => project.templateInstances)
  project: ProjectEntity;
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
  @OneToMany(
    () => TemplateFieldValueEntity,
    (templateValue) => templateValue.templateInstance,
    { eager: false },
  )
  templateValues: TemplateFieldValueEntity[];
}
