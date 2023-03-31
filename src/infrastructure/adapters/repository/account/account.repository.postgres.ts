import { Injectable } from '@nestjs/common';
import { AccountRepositoryInterface } from '../../../../domain/ports';
import { AccountM } from '../../../../domain/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './entity/account.entity';
import AccountMapper from '../../../mapper/account.mapper';
import { Optional } from 'typescript-optional';

@Injectable()
export default class AccountRepositoryPostgres
  implements AccountRepositoryInterface
{
  constructor(
    @InjectRepository(AccountEntity)
    private accountEntityRepository: Repository<AccountEntity>,
  ) {}

  async updateAccountLastLogin(accountId: string): Promise<void> {
    await this.accountEntityRepository.update(accountId, {
      lastLogin: new Date(),
    });
  }
  async getAll(): Promise<AccountM[]> {
    const accountEntities = await this.accountEntityRepository.find();
    return AccountMapper.toDomains(accountEntities);
  }

  async getAccountById(id: string): Promise<Optional<AccountM>> {
    const entity = await this.accountEntityRepository.findOneBy({ id });
    return AccountMapper.toDomain(entity);
  }

  async createAccount(account: AccountM): Promise<Optional<AccountM>> {
    const accountEntityCreated = await this.accountEntityRepository.save({
      ...account,
    });
    return AccountMapper.toDomain(accountEntityCreated);
  }

  deleteAccount(id: string): Promise<AccountM> {
    return Promise.resolve(undefined);
  }

  disableAccount(id: string): Promise<AccountM> {
    return Promise.resolve(undefined);
  }

  async updateAccount(accountModel: AccountM): Promise<Optional<AccountM>> {
    const entity = await this.accountEntityRepository.save({
      ...accountModel,
    });
    return AccountMapper.toDomain(entity);
  }

  async getAccountByEmail(email: string): Promise<Optional<AccountM>> {
    const accountEntity = await this.accountEntityRepository.findOneBy({
      email,
    });
    return AccountMapper.toDomain(accountEntity);
  }
}
