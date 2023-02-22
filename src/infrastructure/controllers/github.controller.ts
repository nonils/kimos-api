import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import InstallGithubAppUsecase from '../../application/usecases/github/installGithubApp.usecase';
import CreateGithubIntegrationCommand from '../../application/commands/createGithubIntegration.command';
import ResolveGhInstallationCallbackUsecase from '../../application/usecases/github/resolveGhInstallationCallback.usecase';
import CreateGithubRepositoryUsecase from '../../application/usecases/github/createGithubRepository.usecase';

@Controller('/api/v1/github')
export default class GithubController {
  constructor(
    private installGithubAppUsecase: InstallGithubAppUsecase,
    private resolveGhIntegrationCallback: ResolveGhInstallationCallbackUsecase,
    private createGithubRepository: CreateGithubRepositoryUsecase,
  ) {}

  @Post('/installations')
  public async installAppForUser(): Promise<any> {
    const userId = '1234';
    const url = await this.installGithubAppUsecase.handler(userId);
    return {
      status: 'success',
      url,
    };
  }

  @Get('/callback')
  public async getProducts(
    @Req() request,
    @Query('code') code: string,
    @Query('installation_id') installationId: string,
    @Query('setup_action') setupAction: string,
    @Query('state') state: string,
  ): Promise<any> {
    console.log(request);
    console.log(state);
    console.log(code);
    console.log(installationId);
    console.log(setupAction);
    return setupAction;
  }

  @Post('/callback')
  public async createGithubIntegration(
    @Req() request,
    @Body() createGithubIntegrationCommand: CreateGithubIntegrationCommand,
  ): Promise<any> {
    await this.resolveGhIntegrationCallback.handler(
      createGithubIntegrationCommand,
    );
    return {
      status: 'success',
    };
  }

  @Post('/create-repo-for-org')
  public async createRepoForOrg(): Promise<any> {
    const installationId = '63f66edd03bd1288954fc030';
    const repositoryName = 'test-repo';
    await this.createGithubRepository.handler(installationId, repositoryName);
    return {
      status: 'success',
    };
  }
}
