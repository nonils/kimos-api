import { Optional } from 'typescript-optional';
import { IntegrationEntity } from '../adapters/repository/integration/entity/integration.entity';
import { ProjectEntity } from '../adapters/repository/project/entity/project.entity';
import { ProjectM } from '../../domain/models/project.model';
import { AccountEntity } from '../adapters/repository/account/entity/account.entity';

export default class ProjectMapper {
  public static toEntity(project: ProjectM): ProjectEntity {
    const projectEntity = new ProjectEntity();
    projectEntity.id = project.id;
    projectEntity.name = project.name;
    projectEntity.owner = new AccountEntity();
    projectEntity.owner.id = project.owner;
    projectEntity.integrations = project.integrations.map((integration) => {
      const integrationEntity = new IntegrationEntity();
      integrationEntity.id = integration;
      return integrationEntity;
    });
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
      projectEntity.owner.id,
      projectEntity.description,
      projectEntity.type,
      projectEntity.integrations.map((integration) => integration.id),
    );
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
