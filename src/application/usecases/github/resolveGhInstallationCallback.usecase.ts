import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import CreateGithubIntegrationCommand from '../../commands/createGithubIntegration.command';
import GithubIntegrationFactory from '../../factory/githubIntegration.factory';
import { GithubIntegrationRepositoryInterface } from '../../../domain/ports';
import GithubClient from '../../../infrastructure/adapters/client/github/github.client';

@Injectable()
export default class ResolveGhInstallationCallbackUsecase {
  private redis: Redis;
  constructor(
    private readonly redisService: RedisService,
    @Inject('GithubIntegrationRepository')
    private readonly githubIntegrationRepository: GithubIntegrationRepositoryInterface,
    @Inject('GithubClient')
    private readonly githubClient: GithubClient,
    private githubIntegrationFactory: GithubIntegrationFactory,
  ) {
    this.redis = this.redisService.getClient();
  }

  public async handler(
    createGithubIntegrationCommand: CreateGithubIntegrationCommand,
  ): Promise<any> {
    const userId = await this.redis.get(createGithubIntegrationCommand.state);
    // Check with github if the userId doesn't exists in redis (expired) what should we do?
    if (!userId) {
      throw new Error('No user id found');
    }
    const githubIntegration =
      this.githubIntegrationFactory.createGithubIntegration(
        createGithubIntegrationCommand,
      );
    const result = await this.githubClient.getRepositoriesByInstallationId(
      createGithubIntegrationCommand.githubInstallationId,
    );
    console.log(result);
    githubIntegration.userId = userId;
    return this.githubIntegrationRepository.createGithubIntegration(
      githubIntegration,
    );
  }
}
