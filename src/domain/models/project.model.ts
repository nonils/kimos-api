import { ProjectType } from './projectType.enum';
import { ProjectState } from './projectState.enum';

export class ProjectM {
  constructor(
    id: string,
    name: string,
    createdBy: string,
    description: string,
    organizationId: string,
    type: ProjectType,
    repositoryId: string,
    repositoryName: string,
    repositoryUrl: string,
    jiraProjectId: string,
    jiraProjectName: string,
    jiraProjectKey: string,
    allowsJiraIntegration: boolean,
    integrations: string[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
    this.description = description;
    this.organizationId = organizationId;
    this.repositoryId = repositoryId;
    this.repositoryName = repositoryName;
    this.repositoryUrl = repositoryUrl;
    this.jiraProjectId = jiraProjectId;
    this.jiraProjectName = jiraProjectName;
    this.jiraProjectKey = jiraProjectKey;
    this.allowsJiraIntegration = allowsJiraIntegration;
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
  jiraProjectUrl: string;
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
