import { Controller, Get, Post } from '@nestjs/common';
import { ApplicationM } from '../../domain/models/application.model';
import { CreateApplicationUsecase } from '../../application/usecases/application/createApplication.usecase';

@Controller('/api/v1/applications')
export default class ApplicationController {
  constructor(
    private readonly createApplicationUseCase: CreateApplicationUsecase,
  ) {}

  @Post('')
  public async createApplication(): Promise<ApplicationM> {
    return this.createApplicationUseCase.handler();
  }
}
