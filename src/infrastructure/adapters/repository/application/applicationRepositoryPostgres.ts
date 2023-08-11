import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Optional } from 'typescript-optional';
import { ApplicationEntity } from './entity/application.entity';
import { ApplicationRepositoryInterface } from '../../../../domain/ports';
import { ApplicationM } from '../../../../domain/models';
import { ApplicationMapper } from '../../../mapper/application.mapper';

@Injectable()
export default class ApplicationRepositoryPostgres
  implements ApplicationRepositoryInterface
{
  constructor(
    @InjectRepository(ApplicationEntity)
    private applicationEntityRepository: Repository<ApplicationEntity>,
  ) {}

  async getApplicationsByProjectId(
    projectId: string,
    page: number,
    size: number,
  ): Promise<ApplicationM[]> {
    const query = this.applicationEntityRepository
      .createQueryBuilder('application')
      .where('application.project.id = :projectId', { projectId });
    const applicationEntities = await query
      .skip(page * size)
      .take(size)
      .getMany();
    return ApplicationMapper.toDomains(applicationEntities);
  }

  async countApplicationsByProjectId(projectId: string): Promise<number> {
    const query = this.applicationEntityRepository
      .createQueryBuilder('application')
      .where('application.project.id = :projectId', { projectId });
    return query.getCount();
  }

  async createApplication(
    applicationModel: ApplicationM,
  ): Promise<Optional<ApplicationM>> {
    const result = await this.applicationEntityRepository.save({
      name: applicationModel.name,
      description: applicationModel.description,
      allowsJiraIntegration: applicationModel.allowsJiraIntegration,
      jiraKey: applicationModel.jiraKey,
      jiraProjectName: applicationModel.jiraProjectName,
      isPrivateRepo: applicationModel.isPrivateRepo,
      repositoryName: applicationModel.repositoryName,
      createdBy: { id: applicationModel.createdBy },
      project: { id: applicationModel.projectId },
      templateImplementation: {
        id: applicationModel.templateImplementationId,
      },
    });
    return ApplicationMapper.toDomain(result);
  }
}
