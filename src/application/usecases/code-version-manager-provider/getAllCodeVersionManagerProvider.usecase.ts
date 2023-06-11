import { Inject, Injectable } from '@nestjs/common';
import { CodeVersionManagerProviderM } from '../../../domain/models';
import { CodeVersionManagerProviderRepositoryInterface } from '../../../domain/ports/codeVersionManagerProviderRepository.interface';

@Injectable()
export class GetAllCodeVersionManagerProviderUsecase {
  constructor(
    @Inject('CodeVersionManagerProviderRepository')
    private codeVersionManagerProviderRepository: CodeVersionManagerProviderRepositoryInterface,
  ) {}

  public async handler(): Promise<CodeVersionManagerProviderM[]> {
    return this.codeVersionManagerProviderRepository.getAllCodeVersionManagerProviders();
  }
}
