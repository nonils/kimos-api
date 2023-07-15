import { Optional } from 'typescript-optional';
import { ProjectEntity } from '../adapters/repository/project/entity/project.entity';
import { ProjectM } from '../../domain/models';
import { AccountEntity } from '../adapters/repository/account/entity/account.entity';

export default class ProjectMapper {
  public static toEntity(project: ProjectM): ProjectEntity {
    const projectEntity = new ProjectEntity();
    projectEntity.id = project.id;
    projectEntity.name = project.name;
    projectEntity.account = new AccountEntity();
    projectEntity.account.id = project.createdBy;
    projectEntity.type = project.type;
    return projectEntity;
  }
  public static toDomain(projectEntity?: ProjectEntity): Optional<ProjectM> {
    if (!projectEntity) {
      return Optional.empty<ProjectM>();
    }
    const project = new ProjectM(
      projectEntity.id,
      projectEntity.name,
      projectEntity.account.id,
      projectEntity.description,
      projectEntity.organizationId,
      projectEntity.type,
      projectEntity.repositoryId,
      projectEntity.repositoryName,
      projectEntity.repositoryUrl,
      projectEntity.jiraProjectId,
      projectEntity.jiraProjectName,
      projectEntity.jiraProjectKey,
      projectEntity.allowsJiraIntegration,
      [],
    );
    project.isPrivateRepo = projectEntity.isPrivateRepo;
    project.templateImplementationId =
      projectEntity.templateInstance?.templateImplementationId;
    project.setCreateAt(new Date(projectEntity.createdAt));
    return Optional.of(project);
  }

  public static toDomains(projectEntities: ProjectEntity[]): ProjectM[] {
    const projects = new Array<ProjectM>();
    projectEntities.forEach((projectEntity) => {
      const product = this.toDomain(projectEntity);
      projects.push(product.get());
    });
    return projects;
  }
}
