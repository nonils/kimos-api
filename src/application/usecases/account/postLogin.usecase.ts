import { Inject, Injectable } from '@nestjs/common';
import { AccountRepositoryInterface } from '../../../domain/ports';
import { AccountM } from '../../../domain/models';
import { Optional } from 'typescript-optional';

@Injectable()
export default class PostLoginUsecase {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: AccountRepositoryInterface,
  ) {}
  public async handler(user: any): Promise<Optional<AccountM>> {
    let account = new AccountM();
    account.externalId = user.user_id;
    account.email = user.email;
    const existentAccount = await this.accountRepository.getAccountByEmail(
      account.email,
    );
    account.lastLogin = new Date();
    const accountId = user?.user_metadata?.accountId;
    const persistedAccount = await this.accountRepository.getAccountById(
      accountId,
    );
    //If I dont have the account id in the user_metadata, I create a new account
    if (!accountId || !persistedAccount.isPresent()) {
      if (user.user_id.startsWith('google-oauth2|')) {
        account.name = user.given_name;
        account.lastName = user.family_name;
        account.imageUrl = user.picture;
      }
      if (existentAccount.isPresent()) {
        const existentAccountUnwrapped = existentAccount.get();
        existentAccountUnwrapped.externalId = account.externalId;
        account = (
          await this.accountRepository.updateAccount(existentAccountUnwrapped)
        ).get();
      } else {
        account = (await this.accountRepository.createAccount(account)).get();
      }
      return Optional.of(account);
    } else {
      await this.accountRepository.updateAccountLastLogin(accountId);
      return persistedAccount;
    }
  }
}
