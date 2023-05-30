import { Controller, Get } from '@nestjs/common';
import { GetAllCloudProvidersUsecase } from '../../application/usecases/cloud-provider/getAllCloudProvider.usecase';

@Controller('/api/v1/cloud-providers')
export default class CloudProviderController {
  constructor(
    private readonly getAllCloudProvidersUsecase: GetAllCloudProvidersUsecase,
  ) {}
  @Get()
  async getAllCloudProviders(): Promise<any> {
    return this.getAllCloudProvidersUsecase.handler();
  }
}
