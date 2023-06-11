import { Inject, Injectable } from '@nestjs/common';
import { CICDProviderRepositoryInterface } from '../../../domain/ports/cicdProviderRepository.interface';
import { CICDProviderM } from '../../../domain/models';

@Injectable()
export class GetAllCICDProvidersUsecase {
  constructor(
    @Inject('CICDProviderRepository')
    private cicdProviderRepository: CICDProviderRepositoryInterface,
  ) {}
  public async handler(): Promise<CICDProviderM[]> {
    return this.cicdProviderRepository.getAllCICDProviders();
  }
}
