import { Inject, Injectable } from '@nestjs/common';
import { AccountRepositoryInterface } from '../../../domain/ports';
import { AccountM } from '../../../domain/models';

@Injectable()
export default class CreateAccountUsecase {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: AccountRepositoryInterface,
  ) {}
  public async handler(accountModel: AccountM): Promise<AccountM> {
    return this.accountRepository.createAccount(accountModel);
  }
}
