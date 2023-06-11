import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { TemplateEntity } from './template.entity';
import { CICDProviderEntity } from '../../cicd-provider/entity/CICDProvider.entity';
import { CloudProviderEntity } from '../../cloud-provider/entity/cloudProvider.entity';
import { CodeVersionManagerProviderEntity } from '../../code-version-manager-provider/entity/codeVersionManagerProvider.entity';

@Entity({ name: 'Template_Implementations' })
export class TemplateImplementationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @RelationId(
    (templateImplementation: TemplateImplementationEntity) =>
      templateImplementation.template,
  )
  templateId: string;
  @ManyToOne(() => TemplateEntity, { eager: true })
  @JoinColumn({ name: 'template_id' })
  template: TemplateEntity;
  @RelationId((templateImplementation: TemplateImplementationEntity) => {
    return templateImplementation.cicdProvider;
  })
  cicdProviderId: string;
  @ManyToOne(() => CICDProviderEntity)
  @JoinColumn({ name: 'ci_cd_provider_id' })
  cicdProvider: CICDProviderEntity;
  @RelationId((templateImplementation: TemplateImplementationEntity) => {
    return templateImplementation.cloudProvider;
  })
  cloudProviderId: string;
  @ManyToOne(() => CloudProviderEntity)
  @JoinColumn({ name: 'cloud_provider_id' })
  cloudProvider: CloudProviderEntity;
  @RelationId((templateImplementation: TemplateImplementationEntity) => {
    return templateImplementation.codeVersionManagerProvider;
  })
  codeVersionManagerProviderId: string;
  @ManyToOne(() => CodeVersionManagerProviderEntity)
  @JoinColumn({ name: 'code_version_manager_provider_id' })
  codeVersionManagerProvider: CodeVersionManagerProviderEntity;
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
