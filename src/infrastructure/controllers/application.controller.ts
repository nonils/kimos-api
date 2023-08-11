import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApplicationM } from '../../domain/models';
import { CreateApplicationUsecase } from '../../application/usecases/application/createApplication.usecase';
import CreateApplicationCommand from '../../application/commands/application/createApplication.command';
import ApplicationFactory from '../../application/factory/application.factory';

@Controller('/api/v1/applications')
export default class ApplicationController {
  constructor(
    private readonly createApplicationUseCase: CreateApplicationUsecase,
    private readonly applicationFactory: ApplicationFactory,
  ) {}

  @Post('')
  public async createApplication(
    @Req() request,
    @Body() createApplicationCommand: CreateApplicationCommand,
  ): Promise<ApplicationM> {
    return this.createApplicationUseCase.handler(
      this.applicationFactory.createApplicationModelFromCreateApplicationCommand(
        createApplicationCommand,
        request.auth.accountId,
      ),
    );
  }
}
