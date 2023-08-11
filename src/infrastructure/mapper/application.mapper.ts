import { ApplicationEntity } from '../adapters/repository/application/entity/application.entity';
import { ApplicationM } from '../../domain/models';
import { Optional } from 'typescript-optional';

export class ApplicationMapper {
  public static toDomain(
    applicationEntity?: ApplicationEntity,
  ): Optional<ApplicationM> {
    if (!applicationEntity) {
      return Optional.empty<ApplicationM>();
    }
    const application = new ApplicationM();
    application.id = applicationEntity.id;
    application.templateImplementationId =
      applicationEntity.templateImplementationId;
    application.projectId = applicationEntity.projectId;
    application.name = applicationEntity.name;
    application.description = applicationEntity.description;
    application.allowsJiraIntegration = applicationEntity.allowsJiraIntegration;
    application.jiraProjectName = applicationEntity.jiraProjectName;
    application.jiraKey = applicationEntity.jiraKey;
    application.isPrivateRepo = applicationEntity.isPrivateRepo;
    application.repositoryName = applicationEntity.repositoryName;
    application.status = applicationEntity.status;
    application.createdBy = applicationEntity.createdById;
    application.createdAt = applicationEntity.createdAt;
    application.updatedAt = applicationEntity.updatedAt;
    application.isDeleted = applicationEntity.isDeleted;
    return Optional.of(application);
  }

  public static toDomains(
    applicationEntities: ApplicationEntity[],
  ): ApplicationM[] {
    return applicationEntities.map((applicationEntity) =>
      this.toDomain(applicationEntity).get(),
    );
  }
}
