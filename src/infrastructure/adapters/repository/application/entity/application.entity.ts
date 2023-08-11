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
import { AccountEntity } from '../../account/entity/account.entity';
import { ApplicationStatus } from '../../../../../domain/models';

@Entity('Applications')
export class ApplicationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    name: 'name',
    nullable: false,
  })
  name: string;
  @Column({
    name: 'description',
  })
  description: string;
  @Column({
    name: 'allows_jira_integration',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  allowsJiraIntegration: boolean;
  @Column({
    name: 'jira_project_name',
    type: 'varchar',
    nullable: true,
  })
  jiraProjectName: string;
  @Column({
    name: 'jira_key',
    type: 'varchar',
    nullable: true,
  })
  jiraKey: string;
  @Column({
    name: 'is_private_repo',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isPrivateRepo: boolean;
  @Column({
    name: 'repository_name',
    nullable: false,
  })
  repositoryName: string;
  @Column({
    name: 'status',
    type: 'enum',
    enum: ApplicationStatus,
    nullable: false,
  })
  status: ApplicationStatus;
  @RelationId(
    (application: ApplicationEntity) => application.templateImplementation,
  )
  templateImplementationId: string;
  @RelationId((templateInstance: ApplicationEntity) => templateInstance.project)
  projectId: string;
  @RelationId(
    (applicationEntity: ApplicationEntity) => applicationEntity.createdBy,
  )
  createdById: string;
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

  @ManyToOne(() => AccountEntity, (account) => account.applications, {
    eager: false,
  })
  @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'id',
  })
  createdBy: AccountEntity;

  @OneToMany(
    () => TemplateFieldValueEntity,
    (templateValue) => templateValue.application,
    { eager: false },
  )
  templateValues: TemplateFieldValueEntity[];
}
