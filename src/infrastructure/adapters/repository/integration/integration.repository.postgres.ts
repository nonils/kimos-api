import { Injectable } from '@nestjs/common';
import { Optional } from 'typescript-optional';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntegrationRepositoryInterface } from '../../../../domain/ports/integrationRepository.interface';
import { IntegrationEntity } from './entity/integration.entity';
import { IntegrationM } from '../../../../domain/models/integration.model';
import IntegrationMapper from '../../../mapper/integration.mapper';

@Injectable()
export default class IntegrationRepositoryPostgres
  implements IntegrationRepositoryInterface
{
  constructor(
    @InjectRepository(IntegrationEntity)
    private integrationEntityRepository: Repository<IntegrationEntity>,
  ) {}

  public async createIntegration(
    integration: IntegrationM,
  ): Promise<Optional<IntegrationM>> {
    const integrationCreated = await this.integrationEntityRepository.save({
      name: integration.name,
      description: integration.description,
      type: integration.type,
    });
    return IntegrationMapper.toDomain(integrationCreated);
  }

  deleteIntegration(integrationId: string): Promise<Optional<IntegrationM>> {
    return Promise.resolve(undefined);
  }

  getAll(): Promise<IntegrationM[]> {
    return Promise.resolve([]);
  }

  async getIntegration(id: string): Promise<Optional<IntegrationM>> {
    let optional = Optional.empty<IntegrationM>();
    const integration = await this.integrationEntityRepository.findOneBy({
      id,
    });
    if (integration) {
      optional = await IntegrationMapper.toDomain(integration);
    }
    return optional;
  }

  updateIntegration(
    integration: IntegrationM,
  ): Promise<Optional<IntegrationM>> {
    return Promise.resolve(undefined);
  }
}
