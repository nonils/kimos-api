import { Inject, Injectable } from '@nestjs/common';
import { AccountRepositoryInterface } from '../../../domain/ports';
import { ApplicationRepositoryInterface } from '../../../domain/ports/applicationRepository.interface';
import { ApplicationM } from '../../../domain/models/application.model';

@Injectable()
export class CreateApplicationUsecase {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: AccountRepositoryInterface,
    @Inject('ApplicationRepository')
    private readonly applicationRepository: ApplicationRepositoryInterface,
  ) {}

  //TODO add args here
  public async handler(): Promise<ApplicationM> {
    return null;
  }
}
