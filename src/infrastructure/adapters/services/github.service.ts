import { Inject, Injectable } from '@nestjs/common';
import {
  CodeVersionManagerServiceInterface,
  GithubIntegrationRepositoryInterface,
} from '../../../domain/ports';

@Injectable()
export class GithubService implements CodeVersionManagerServiceInterface {
  constructor(
    @Inject('GithubIntegrationRepository')
    private readonly githubIntegrationRepository: GithubIntegrationRepositoryInterface,
  ) {}
  checkIfRepositoryExistsForIntegration(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    name: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    integrationId: string,
  ): Promise<boolean> {
    return Promise.resolve(false);
  }

  async checkIfIntegrationExistsForAccount(
    accountId: string,
  ): Promise<boolean> {
    const result =
      await this.githubIntegrationRepository.findGithubIntegrationByAccountId(
        accountId,
      );
    return result.isPresent();
  }

  checkIfIntegrationExistsForOrganization(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    organizationId: string,
  ): Promise<boolean> {
    return Promise.resolve(false);
  }

  createRepository(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
