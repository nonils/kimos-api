import { AccountM } from '../models';

export interface AccountRepositoryInterface {
  getAll(): Promise<AccountM[]>;
  getAccountById(id: string): Promise<AccountM>;
  createAccount(accountModel: AccountM): Promise<AccountM>;
  updateAccount(accountModel: AccountM): Promise<AccountM>;
  disableAccount(id: string): Promise<AccountM>;
  deleteAccount(id: string): Promise<AccountM>;
}
