import { Injectable } from '@nestjs/common';
import CreateGithubIntegrationCommand from '../commands/createGithubIntegration.command';
import { GithubIntegrationM } from '../../domain/models';

@Injectable()
export default class GithubIntegrationFactory {
  public createGithubIntegration(
    createGithubIntegrationCommand: CreateGithubIntegrationCommand,
  ): GithubIntegrationM {
    return new GithubIntegrationM(
      '',
      '',
      createGithubIntegrationCommand.githubInstallationId,
      '',
      '',
      undefined,
      '',
    );
  }
}
