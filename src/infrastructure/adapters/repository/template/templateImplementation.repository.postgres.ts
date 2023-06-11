import { Injectable } from '@nestjs/common';
import { TemplateImplementationRepositoryInterface } from '../../../../domain/ports';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemplateImplementationM } from '../../../../domain/models';
import { TemplateImplementationEntity } from './entity/templateImplementation.entity';
import { TemplateImplementationMapper } from '../../../mapper/templateImplementation.mapper';

@Injectable()
export default class TemplateImplementationRepositoryPostgres
  implements TemplateImplementationRepositoryInterface
{
  constructor(
    @InjectRepository(TemplateImplementationEntity)
    private templateImplementationRepository: Repository<TemplateImplementationEntity>,
  ) {}

  public async getAllTemplateImplementationsByTemplateId(
    id: string,
  ): Promise<TemplateImplementationM[]> {
    const templateImplementations =
      await this.templateImplementationRepository.find({
        where: {
          template: { id },
        },
        relations: {
          cicdProvider: true,
          cloudProvider: true,
          codeVersionManagerProvider: true,
        },
      });
    return TemplateImplementationMapper.toDomains(templateImplementations);
  }
}
