import { Controller, Get } from '@nestjs/common';
import { GetAllCICDProvidersUsecase } from '../../application/usecases/cicd-provider/getAllCICDProviders.usecase';

@Controller('/api/v1/cicd-providers')
export default class CICDProviderController {
  constructor(
    private readonly getAllCICDProvidersUsecase: GetAllCICDProvidersUsecase,
  ) {}
  @Get()
  async getAllCICDProviders(): Promise<any> {
    return this.getAllCICDProvidersUsecase.handler();
  }
}
