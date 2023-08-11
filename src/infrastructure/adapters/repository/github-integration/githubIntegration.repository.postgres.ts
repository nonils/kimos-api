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
      await this.githubIntegrationEntityRepository.save({
        accountId: githubIntegration.accountId,
        githubInstallationId: githubIntegration.githubInstallationId,
        targetType: githubIntegration.targetType,
        targetId: githubIntegration.targetId,
        lastGithubUpdated: githubIntegration.lastGithubUpdated,
        githubAccountLogin: githubIntegration.githubAccountLogin,
      });
    return GithubIntegrationMapper.toDomain(githubIntegrationCreated);
  }

  async deleteGithubIntegration(
    githubIntegrationId: string,
  ): Promise<Optional<GithubIntegrationM>> {
    const result = await this.getGithubIntegration(githubIntegrationId);
    if (result.isPresent()) {
      await this.githubIntegrationEntityRepository.update(
        {
          id: githubIntegrationId,
        },
        {
          isDeleted: true,
          deletedAt: new Date(),
        },
      );
    }
    return result;
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    githubIntegration: GithubIntegrationM,
  ): Promise<Optional<GithubIntegrationM>> {
    return Promise.resolve(undefined);
  }

  async findGithubIntegrationByAccountId(
    accountId: string,
  ): Promise<Optional<GithubIntegrationM>> {
    const result = await this.githubIntegrationEntityRepository.findOneBy({
      account: { id: accountId },
    });
    return GithubIntegrationMapper.toDomain(result);
  }
}
