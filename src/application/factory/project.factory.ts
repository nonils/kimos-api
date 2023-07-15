import { Injectable } from '@nestjs/common';
import { ProjectM, ProjectType } from '../../domain/models';
import CreateProjectCommand from '../commands/project/createProject.command';

@Injectable()
export default class ProjectFactory {
  public createProject(createProjectCommand: CreateProjectCommand): ProjectM {
    const projectModel = new ProjectM(
      undefined,
      createProjectCommand.name,
      undefined,
      createProjectCommand.description,
      createProjectCommand.organizationId,
      createProjectCommand.organizationId
        ? ProjectType.ORGANIZATION
        : ProjectType.PERSONAL,
      undefined,
      createProjectCommand.repositoryName,
      undefined,
      undefined,
      createProjectCommand.jiraProjectName,
      createProjectCommand.jiraProjectKey,
      createProjectCommand.allowsJiraIntegration,
      [],
    );
    projectModel.jiraProjectKey = createProjectCommand.jiraProjectKey;
    projectModel.allowsJiraIntegration =
      createProjectCommand.allowsJiraIntegration;
    projectModel.jiraProjectName = createProjectCommand.jiraProjectName;
    projectModel.isPrivateRepo = createProjectCommand.isPrivateRepo;
    projectModel.repositoryName = createProjectCommand.repositoryName;
    projectModel.templateImplementationId =
      createProjectCommand.templateImplementationId;
    return projectModel;
  }
}
