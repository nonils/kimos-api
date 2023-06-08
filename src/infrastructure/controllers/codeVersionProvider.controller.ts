import { Controller, Get } from '@nestjs/common';
import { GetAllCodeVersionManagerProviderUsecase } from '../../application/usecases/code-version-manager-provider/getAllCodeVersionManagerProvider.usecase';
import { CodeVersionManagerProviderM } from '../../domain/models';

@Controller('/api/v1/code-version-providers')
export default class CodeVersionProviderController {
  constructor(
    private readonly getAllCodeVersionProvidersUsecase: GetAllCodeVersionManagerProviderUsecase,
  ) {}
  @Get()
  async getAllCodeVersionProviders(): Promise<CodeVersionManagerProviderM[]> {
    return this.getAllCodeVersionProvidersUsecase.handler();
  }
}
