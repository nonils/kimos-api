import { Inject, Injectable } from '@nestjs/common';
import { CodeVersionManagerServiceInterface } from '../../../domain/ports';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../../../config/env.enum';

@Injectable()
export class CodeVersionManagerServiceFactory {
  private services: Map<string, CodeVersionManagerServiceInterface>;
  private readonly githubCodeVersionManagerId: string;
  constructor(
    private configService: ConfigService,
    @Inject('GithubService')
    private readonly githubService: CodeVersionManagerServiceInterface,
  ) {
    this.services = new Map<string, CodeVersionManagerServiceInterface>();
    this.githubCodeVersionManagerId = this.configService.get(
      Configuration.GITHUB_CODE_VERSION_MANAGER_ID,
    );
    this.services.set(this.githubCodeVersionManagerId, this.githubService);
  }

  getService(codeVersionManagerId: string): CodeVersionManagerServiceInterface {
    const result = this.services.get(codeVersionManagerId);
    if (!result) {
      //TODO change by a custom exception
      throw new Error('Code version manager not implemented yet');
    }
    return result;
  }
}
