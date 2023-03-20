import { Injectable } from '@nestjs/common';
import { AccountRepositoryInterface } from '../../../../domain/ports';
import { AccountM } from '../../../../domain/models';

@Injectable()
export default class AccountRepositoryPostgres
  implements AccountRepositoryInterface
{
  getAll(): Promise<AccountM[]> {
    return Promise.resolve([]);
  }

  getAccountById(id: string): Promise<AccountM> {
    return Promise.resolve(new AccountM());
  }

  createAccount(accountModel: AccountM): Promise<AccountM> {
    return Promise.resolve(undefined);
  }

  deleteAccount(id: string): Promise<AccountM> {
    return Promise.resolve(undefined);
  }

  disableAccount(id: string): Promise<AccountM> {
    return Promise.resolve(undefined);
  }

  updateAccount(accountModel: AccountM): Promise<AccountM> {
    return Promise.resolve(undefined);
  }
}
