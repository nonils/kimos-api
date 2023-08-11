import { Injectable } from '@nestjs/common';
import CreateApplicationCommand from '../commands/application/createApplication.command';
import { ApplicationM } from '../../domain/models';

@Injectable()
export default class ApplicationFactory {
  public createApplicationModelFromCreateApplicationCommand(
    createApplicationCommand: CreateApplicationCommand,
    authenticatedUserId: string | null = null,
  ): ApplicationM {
    const application = new ApplicationM();
    application.name = createApplicationCommand.name;
    application.description = createApplicationCommand.description;
    application.templateImplementationId =
      createApplicationCommand.templateImplementationId;
    application.projectId = createApplicationCommand.projectId;
    application.createdBy = authenticatedUserId;
    application.allowsJiraIntegration =
      createApplicationCommand.allowsJiraIntegration;
    application.jiraKey = createApplicationCommand.jiraKey;
    application.jiraProjectName = createApplicationCommand.jiraProjectName;
    application.isPrivateRepo = createApplicationCommand.isPrivateRepo;
    application.repositoryName = createApplicationCommand.repositoryName;

    return application;
  }
}
