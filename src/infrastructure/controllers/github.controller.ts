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
    const userId = '568f7743-2a64-41d4-99fd-7e71f702e7a3';
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
    const installationId = 'a2d7792b-1fe5-4005-8ba4-0f0e34152847';
    const repositoryName = 'test-repo';
    const isPrivate = true;
    await this.createGithubRepository.handler(
      installationId,
      repositoryName,
      isPrivate,
    );
    return {
      status: 'success',
    };
  }
}
