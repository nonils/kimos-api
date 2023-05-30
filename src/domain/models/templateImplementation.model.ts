import { CICDProviderM } from './CICDProvider.model';
import { CodeVersionManagerProviderM } from './codeVersionManagmentProvider.model';
import { CloudProviderM } from './cloudProvider.model';

export class TemplateImplementationM {
  id: string;
  templateId: string;
  cicdProviderId: string;
  codeSystemVersionControlId: string;
  cloudProviderId: string;
  cicdProvider: CICDProviderM;
  cloudProvider: CloudProviderM;
  codeSystemVersionControl: CodeVersionManagerProviderM;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
