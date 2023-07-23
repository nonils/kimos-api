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
import { TemplateImplementationEntity } from '../../template/entity/templateImplementation.entity';
import { ProjectEntity } from '../../project/entity/project.entity';
import { TemplateFieldValueEntity } from '../../template/entity/templateFieldValue.entity';

@Entity('Applications')
export class ApplicationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @RelationId(
    (application: ApplicationEntity) => application.templateImplementation,
  )
  templateImplementationId: string;
  @RelationId((templateInstance: ApplicationEntity) => templateInstance.project)
  projectId: string;
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
    (templateValue) => templateValue.application,
    { eager: false },
  )
  templateValues: TemplateFieldValueEntity[];
}
