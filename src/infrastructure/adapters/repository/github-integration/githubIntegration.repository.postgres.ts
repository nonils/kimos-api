import { Injectable } from '@nestjs/common';
import { Optional } from 'typescript-optional';
import GithubIntegrationMapper from '../../../mapper/githubIntegration.mapper';
import { GithubIntegrationRepositoryInterface } from '../../../../domain/ports';
import { GithubIntegrationM } from '../../../../domain/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GithubIntegrationEntity } from './entity/githubIntegration.entity';

@Injectable()
export default class GithubIntegrationRepositoryPostgres
  implements GithubIntegrationRepositoryInterface
{
  constructor(
    @InjectRepository(GithubIntegrationEntity)
    private githubIntegrationEntityRepository: Repository<GithubIntegrationEntity>,
  ) {}

  public async createGithubIntegration(
    githubIntegration: GithubIntegrationM,
  ): Promise<Optional<GithubIntegrationM>> {
    const githubIntegrationCreated =
      await this.githubIntegrationEntityRepository.save(githubIntegration);
    return GithubIntegrationMapper.toDomain(githubIntegrationCreated);
  }

  deleteGithubIntegration(
    githubIntegrationId: string,
  ): Promise<Optional<GithubIntegrationM>> {
    return Promise.resolve(undefined);
  }

  getAll(): Promise<GithubIntegrationM[]> {
    return Promise.resolve([]);
  }

  async getGithubIntegration(
    id: string,
  ): Promise<Optional<GithubIntegrationM>> {
    let optional = Optional.empty<GithubIntegrationM>();
    const integration = await this.githubIntegrationEntityRepository.findOneBy({
      id,
    });
    if (integration) {
      optional = await GithubIntegrationMapper.toDomain(integration);
    }
    return optional;
  }

  updateGithubIntegration(
    githubIntegrationId: string,
    githubIntegration: GithubIntegrationM,
  ): Promise<Optional<GithubIntegrationM>> {
    return Promise.resolve(undefined);
  }
}
