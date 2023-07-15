import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { TemplateImplementationEntity } from './templateImplementation.entity';
import { ProjectEntity } from '../../project/entity/project.entity';
import { TemplateFieldValueEntity } from './templateFieldValue.entity';

@Entity('Template_Instances')
export class TemplateInstanceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @RelationId(
    (templateInstance: TemplateInstanceEntity) =>
      templateInstance.templateImplementation,
  )
  templateImplementationId: string;
  @ManyToOne(() => TemplateImplementationEntity)
  @JoinColumn({ name: 'template_implementation_id' })
  templateImplementation: TemplateImplementationEntity;
  @OneToOne(() => ProjectEntity, (project) => project.templateInstance)
  @JoinColumn({
    name: 'project_id',
  })
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
