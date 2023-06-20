import { ProjectType } from './projectType.enum';
import { ProjectState } from './projectState.enum';

export class ProjectM {
  constructor(
    id: string,
    name: string,
    createdBy: string,
    description: string,
    type: ProjectType,
    organizationId: string,
    integrations: string[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
    this.description = description;
    this.organizationId = organizationId;
    this.type = type;
    this.integrations = integrations;
  }

  id: string;
  name: string;
  isPrivateRepo: boolean;
  repositoryName: string;
  state: ProjectState;
  templateImplementationId: string;
  repositoryId: string;
  repositoryUrl: string;
  allowsJiraIntegration: boolean;
  jiraProjectKey: string;
  jiraProjectName: string;
  jiraProjectId: string;
  createdBy: string;
  organizationId: string;
  description: string;
  type: ProjectType;
  integrations: string[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date;

  setCreateAt(date: Date) {
    this.createdAt = date;
  }

  setUpdatedAt(date: Date) {
    this.updatedAt = date;
  }

  setDeletedAt(date: Date) {
    this.deletedAt = date;
  }
}
