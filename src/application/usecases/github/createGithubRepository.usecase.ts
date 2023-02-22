import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GithubIntegrationRepositoryInterface } from '../../../domain/ports';
import GithubClient from '../../../infrastructure/adapters/client/github/github.client';

@Injectable()
export default class CreateGithubRepositoryUsecase {
  constructor(
    private configService: ConfigService,
    @Inject('GithubIntegrationRepository')
    private readonly githubIntegrationRepository: GithubIntegrationRepositoryInterface,
    @Inject('GithubClient')
    private readonly githubClient: GithubClient,
  ) {}

  public async handler(
    githubInstallationId: string,
    repositoryName: string,
  ): Promise<string> {
    const installation =
      await this.githubIntegrationRepository.getGithubIntegration(
        githubInstallationId,
      );
    if (!installation.isPresent()) {
      throw new Error('Installation not found');
    }
    const installationValue = installation.get();
    let response;
    if (installationValue.targetType === 'Organization') {
      response = await this.githubClient.createRepositoryInOrganization(
        installationValue.githubInstallationId,
        installationValue.githubAccountLogin,
        repositoryName,
      );
    }
    return 'ok';
  }
}
