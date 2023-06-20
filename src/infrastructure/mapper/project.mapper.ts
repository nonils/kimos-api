import { Optional } from 'typescript-optional';
import { ProjectEntity } from '../adapters/repository/project/entity/project.entity';
import { ProjectM, ProjectType } from '../../domain/models';
import { AccountEntity } from '../adapters/repository/account/entity/account.entity';
import CreateProjectCommand from '../../application/commands/project/createProject.command';

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
      projectEntity.type,
      '',
      [],
    );
    project.setCreateAt(new Date(projectEntity.createdAt));
    return Optional.of(project);
  }

  public static toDomainFromCreateProjectCommand(
    createProjectCommand: CreateProjectCommand,
  ): ProjectM {
    const projectModel = new ProjectM(
      undefined,
      createProjectCommand.name,
      undefined,
      createProjectCommand.description,
      createProjectCommand.organizationId
        ? ProjectType.ORGANIZATION
        : ProjectType.PERSONAL,
      createProjectCommand.organizationId,
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

  public static toDomains(projectEntities: ProjectEntity[]): ProjectM[] {
    const projects = new Array<ProjectM>();
    projectEntities.forEach((projectEntity) => {
      const product = this.toDomain(projectEntity);
      projects.push(product.get());
    });
    return projects;
  }
}
