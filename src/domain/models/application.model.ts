import { ApplicationStatus } from './applicationStatus.enum';

export class ApplicationM {
  id: string;
  projectId: string;
  name: string;
  description: string;
  allowsJiraIntegration: boolean;
  jiraProjectName: string;
  jiraKey: string;
  isPrivateRepo: boolean;
  repositoryName: string;
  status: ApplicationStatus;
  templateImplementationId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;

  setCreateAt(date: Date) {
    this.createdAt = date;
  }
}
