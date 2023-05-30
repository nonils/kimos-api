import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { TemplateEntity } from './template.entity';
import { CICDProviderEntity } from '../../cicd-provider/entity/CICDProvider.entity';
import { CloudProviderEntity } from '../../cloud-provider/entity/cloudProvider.entity';
import { CodeVersionManagerProviderEntity } from '../../code-version-manager-provider/entity/codeVersionManagerProvider.entity';

@Entity()
export class TemplateImplementationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @RelationId(
    (templateImplementation: TemplateImplementationEntity) =>
      templateImplementation.template,
  )
  templateId: string;
  @ManyToOne(() => TemplateEntity)
  template: TemplateEntity;
  @RelationId((templateImplementation: TemplateImplementationEntity) => {
    return templateImplementation.cicdProvider;
  })
  cicdProviderId: string;
  @ManyToOne(() => CICDProviderEntity)
  cicdProvider: CICDProviderEntity;
  @RelationId((templateImplementation: TemplateImplementationEntity) => {
    return templateImplementation.cloudProvider;
  })
  cloudProviderId: string;
  @ManyToOne(() => CloudProviderEntity)
  cloudProvider: CloudProviderEntity;
  @RelationId((templateImplementation: TemplateImplementationEntity) => {
    return templateImplementation.codeVersionManagerProvider;
  })
  codeVersionManagerProviderId: string;
  @ManyToOne(() => CodeVersionManagerProviderEntity)
  codeVersionManagerProvider: CodeVersionManagerProviderEntity;
}
