import { Optional } from 'typescript-optional';
import { AccountM } from '../../domain/models';
import { AccountEntity } from '../adapters/repository/account/entity/account.entity';

export default class AccountMapper {
  public static toEntity(account: AccountM): AccountEntity {
    const accountEntity = new AccountEntity();
    accountEntity.id = account.id;
    accountEntity.email = account.email;
    accountEntity.externalId = account.externalId;
    return accountEntity;
  }
  public static toDomain(accountEntity?: AccountEntity): Optional<AccountM> {
    if (!accountEntity) {
      return Optional.empty<AccountM>();
    }
    const account = new AccountM();
    account.id = accountEntity.id;
    account.email = accountEntity.email;
    account.externalId = accountEntity.externalId;
    account.imageUrl = accountEntity.imageUrl;

    account.setCreateAt(new Date(accountEntity.createdAt));
    return Optional.of(account);
  }

  public static toDomains(accountEntities: AccountEntity[]): AccountM[] {
    return accountEntities.map((accountEntity) => {
      const account = this.toDomain(accountEntity);
      return account.get();
    });
  }
}
