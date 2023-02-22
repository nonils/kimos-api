import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import CreateGithubIntegrationCommand from '../../commands/createGithubIntegration.command';
import GithubIntegrationFactory from '../../factory/githubIntegration.factory';
import { GithubIntegrationRepositoryInterface } from '../../../domain/ports';

@Injectable()
export default class ResolveGhInstallationCallbackUsecase {
  private redis: Redis;
  constructor(
    private readonly redisService: RedisService,
    @Inject('GithubIntegrationRepository')
    private readonly githubIntegrationRepository: GithubIntegrationRepositoryInterface,
    private githubIntegrationFactory: GithubIntegrationFactory,
  ) {
    this.redis = this.redisService.getClient();
  }

  public async handler(
    createGithubIntegrationCommand: CreateGithubIntegrationCommand,
  ): Promise<any> {
    const userId = await this.redis.get(createGithubIntegrationCommand.state);
    const githubIntegration =
      this.githubIntegrationFactory.createGithubIntegration(
        createGithubIntegrationCommand,
      );
    githubIntegration.userId = userId;
    return this.githubIntegrationRepository.createGithubIntegration(
      githubIntegration,
    );
  }
}
