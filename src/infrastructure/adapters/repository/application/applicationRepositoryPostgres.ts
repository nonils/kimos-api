import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Optional } from 'typescript-optional';
import { ApplicationEntity } from './entity/application.entity';
import { ApplicationRepositoryInterface } from '../../../../domain/ports/applicationRepository.interface';
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
    templateInstance: ApplicationM,
  ): Promise<Optional<ApplicationM>> {
    const result = await this.applicationEntityRepository.save({
      project: { id: templateInstance.projectId },
      templateImplementation: {
        id: templateInstance.templateImplementationId,
      },
    });
    return ApplicationMapper.toDomain(result);
  }
}
