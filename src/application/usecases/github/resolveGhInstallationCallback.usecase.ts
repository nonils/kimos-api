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
    const stateValue = await this.redis.get(
      createGithubIntegrationCommand.state,
    );
    // Check with GitHub if the userId doesn't exist in redis (expired) what should we do?
    if (!stateValue) {
      throw new Error('State was not found');
    }
    const parsedStateValue = JSON.parse(stateValue);
    if (!parsedStateValue.accountId) {
      throw new Error('accountId was not found in state');
    }
    const accountId = parsedStateValue.accountId;
    const githubIntegration =
      this.githubIntegrationFactory.createGithubIntegration(
        createGithubIntegrationCommand,
      );
    const result = await this.githubClient.getInstallationDetails(
      createGithubIntegrationCommand.githubInstallationId,
    );
    githubIntegration.targetType = result.target_type;
    githubIntegration.targetId = result.target_id;
    githubIntegration.lastGithubUpdated = result.updated_at;
    githubIntegration.githubAccountLogin = result.account.login;
    githubIntegration.accountId = accountId;
    return this.githubIntegrationRepository.createGithubIntegration(
      githubIntegration,
    );
  }
}
