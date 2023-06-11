import { Injectable } from '@nestjs/common';
import { Optional } from 'typescript-optional';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationEntity } from './entity/organization.entity';
import OrganizationMapper from '../../../mapper/organization.mapper';
import { AccountEntity } from '../account/entity/account.entity';
import { OrganizationRepositoryInterface } from '../../../../domain/ports';
import { OrganizationM } from '../../../../domain/models';

@Injectable()
export default class OrganizationRepositoryPostgres
  implements OrganizationRepositoryInterface
{
  constructor(
    @InjectRepository(OrganizationEntity)
    private organizationEntityRepository: Repository<OrganizationEntity>,
  ) {}

  async getOrganizationById(id: string): Promise<Optional<OrganizationM>> {
    const result = await this.organizationEntityRepository.findOneBy({ id });
    return OrganizationMapper.toDomain(result);
  }
  async createOrganization(
    organizationModel: OrganizationM,
  ): Promise<Optional<OrganizationM>> {
    const ownerAccount = new AccountEntity();
    ownerAccount.id = organizationModel.ownerId;
    const organizationCreated = await this.organizationEntityRepository.save({
      name: organizationModel.name,
      description: organizationModel.description,
      owner: ownerAccount,
      url: organizationModel.url,
      email: organizationModel.email,
      imageUrl: organizationModel.imageUrl,
      billingEmail: organizationModel.billingEmail,
      plan: organizationModel.plan,
    });
    return OrganizationMapper.toDomain(organizationCreated);
  }
  updateOrganization(
    OrganizationModel: OrganizationM,
  ): Promise<Optional<OrganizationM>> {
    throw new Error('Method not implemented.');
  }
  disableOrganization(id: string): Promise<OrganizationM> {
    throw new Error('Method not implemented.');
  }
  deleteOrganization(id: string): Promise<OrganizationM> {
    throw new Error('Method not implemented.');
  }
  async getOrganizationsByAccount(accountId: string): Promise<OrganizationM[]> {
    const entities = await this.organizationEntityRepository.findBy({
      owner: { id: accountId },
    });
    return OrganizationMapper.toDomains(entities);
  }

  public async getAll(): Promise<OrganizationM[]> {
    const organizations = await this.organizationEntityRepository.find();
    return OrganizationMapper.toDomains(organizations);
  }
}
