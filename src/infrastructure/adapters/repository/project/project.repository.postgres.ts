import { Injectable } from '@nestjs/common';
import { Optional } from 'typescript-optional';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './entity/project.entity';
import { ProjectRepositoryInterface } from '../../../../domain/ports/projectRepository.interface';
import { ProjectM } from '../../../../domain/models/project.model';
import ProjectMapper from '../../../mapper/project.mapper';
import { AccountEntity } from '../account/entity/account.entity';

@Injectable()
export default class ProjectRepositoryPostgres
  implements ProjectRepositoryInterface
{
  constructor(
    @InjectRepository(ProjectEntity)
    private projectEntityRepository: Repository<ProjectEntity>,
  ) {}

  public async getAll(): Promise<ProjectM[]> {
    const projects = await this.projectEntityRepository.find();
    return ProjectMapper.toDomains(projects);
  }

  public async createProject(project: ProjectM): Promise<Optional<ProjectM>> {
    const projectCreated = await this.projectEntityRepository.save({
      name: project.name,
      description: project.description,
      integrations: project.integrations.map((integration) => ({
        id: integration,
      })),
      owner: new AccountEntity(),
    });
    return ProjectMapper.toDomain(projectCreated);
  }

  public async getProject(projectId: string): Promise<Optional<ProjectM>> {
    const projectEntity = await this.projectEntityRepository.findOneBy({
      id: projectId,
    });
    return ProjectMapper.toDomain(projectEntity);
  }

  public async deleteProject(projectId: string): Promise<Optional<ProjectM>> {
    const templateDeleted = await this.getProject(projectId);
    await this.projectEntityRepository.delete({
      id: projectId,
    });
    return templateDeleted;
  }

  public async updateProject(project: ProjectM): Promise<Optional<ProjectM>> {
    const ownerEntity = new AccountEntity();
    ownerEntity.id = project.owner;
    await this.projectEntityRepository.update(
      { id: project.id },
      {
        name: project.name,
        description: project.description,
        type: project.type,
        owner: ownerEntity,
      },
    );
    return this.getProject(project.id);
  }
}
