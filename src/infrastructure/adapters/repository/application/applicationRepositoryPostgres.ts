import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Optional } from 'typescript-optional';
import { ApplicationEntity } from './entity/application.entity';
import { ApplicationRepositoryInterface } from '../../../../domain/ports/applicationRepository.interface';
import { ApplicationM } from '../../../../domain/models/application.model';
import { ApplicationMapper } from '../../../mapper/application.mapper';

@Injectable()
export default class ApplicationRepositoryPostgres
  implements ApplicationRepositoryInterface
{
  constructor(
    @InjectRepository(ApplicationEntity)
    private templateInstanceEntityRepository: Repository<ApplicationEntity>,
  ) {}

  async createTemplateInstance(
    templateInstance: ApplicationM,
  ): Promise<Optional<ApplicationM>> {
    const result = await this.templateInstanceEntityRepository.save({
      project: { id: templateInstance.projectId },
      templateImplementation: {
        id: templateInstance.templateImplementationId,
      },
    });
    return ApplicationMapper.toDomain(result);
  }
}
