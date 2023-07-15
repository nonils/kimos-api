import { Injectable } from '@nestjs/common';
import { Optional } from 'typescript-optional';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from './entity/project.entity';
import { ProjectRepositoryInterface } from '../../../../domain/ports';
import { ProjectM } from '../../../../domain/models';
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

  public async getAllPaginatedByAccountAndOrganizations(
    page: number,
    size: number,
    accountId: string,
    organizationIds: string[],
  ): Promise<ProjectM[]> {
    let query = this.projectEntityRepository
      .createQueryBuilder('project')
      .innerJoin('project.templateInstance', 'templateInstance')
      .innerJoin(
        'templateInstance.templateImplementation',
        'templateImplementation',
      )
      .innerJoin('templateImplementation.cicdProvider', 'cicdProvider')
      .innerJoin('templateImplementation.cloudProvider', 'cloudProvider')
      .innerJoin(
        'templateImplementation.codeVersionManagerProvider',
        'codeVersionManagerProvider',
      )
      .innerJoin('templateImplementation.template', 'template')
      .where('project.account.id = :accountId', { accountId });
    if (organizationIds.length > 0) {
      query = query.orWhere(
        'project.organization.id IN (:...organizationIds)',
        {
          organizationIds,
        },
      );
    }
    const projects = await query
      .skip(page * size)
      .take(size)
      .getMany();
    return ProjectMapper.toDomains(projects);
  }

  public async createProject(project: ProjectM): Promise<Optional<ProjectM>> {
    const projectCreated = await this.projectEntityRepository.save({
      name: project.name,
      description: project.description,
      type: project.type,
      account: { id: project.createdBy },
      isPrivateRepo: project.isPrivateRepo,
      jiraProjectKey: project.jiraProjectKey,
      jiraProjectName: project.jiraProjectName,
      repositoryName: project.repositoryName,
      state: project.state,
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
    ownerEntity.id = project.createdBy;
    await this.projectEntityRepository.update(
      { id: project.id },
      {
        name: project.name,
        description: project.description,
        type: project.type,
        account: ownerEntity,
      },
    );
    return this.getProject(project.id);
  }

  async findByOwner(ownerId: string): Promise<ProjectM[]> {
    const projectEntities = await this.projectEntityRepository.find({
      where: {
        account: {
          id: ownerId,
        },
      },
    });
    return ProjectMapper.toDomains(projectEntities);
  }

  async findByOwnerAndName(ownerId: string, name: string): Promise<ProjectM[]> {
    const projectEntities = await this.projectEntityRepository.find({
      where: {
        name: name,
        account: {
          id: ownerId,
        },
      },
    });
    return ProjectMapper.toDomains(projectEntities);
  }
}
