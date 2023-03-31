import { Inject } from '@nestjs/common';
import { AccountRepositoryInterface } from '../../../domain/ports';
import { Optional } from 'typescript-optional';
import { AccountM } from '../../../domain/models';

export default class GetUserAccountUsecase {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: AccountRepositoryInterface,
  ) {}

  public async handler(accountId: string): Promise<Optional<AccountM>> {
    return this.accountRepository.getAccountById(accountId);
  }
}
