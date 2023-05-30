import { Inject, Injectable } from '@nestjs/common';
import { CloudProviderRepositoryInterface } from '../../../domain/ports';
import { CloudProviderM } from '../../../domain/models';

@Injectable()
export class GetAllCloudProvidersUsecase {
  constructor(
    @Inject('CloudProviderRepository')
    private cloudProviderRepository: CloudProviderRepositoryInterface,
  ) {}

  public async handler(): Promise<CloudProviderM[]> {
    return this.cloudProviderRepository.getAllCloudProviders();
  }
}
