import { AccountM } from '../models';
import { Optional } from 'typescript-optional';

export interface AccountRepositoryInterface {
  getAll(): Promise<AccountM[]>;
  getAccountById(id: string): Promise<Optional<AccountM>>;
  createAccount(accountModel: AccountM): Promise<Optional<AccountM>>;
  updateAccount(accountModel: AccountM): Promise<Optional<AccountM>>;
  disableAccount(id: string): Promise<AccountM>;
  deleteAccount(id: string): Promise<AccountM>;
  getAccountByEmail(email: string): Promise<Optional<AccountM>>;
  updateAccountLastLogin(accountId: string): Promise<void>;
}
