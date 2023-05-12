import { OrganizationM } from 'domain/models';
import {
  AccountRepositoryInterface,
  OrganizationRepositoryInterface,
} from '../../../domain/ports';
import { Inject } from '@nestjs/common';
import { CreateOrganizationCommand } from '../../commands/organization/createOganization.command';
import OrganizationFactory from '../../factory/organization.factory';

export class CreateOrganizationUsecase {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: AccountRepositoryInterface,
    @Inject('OrganizationRepository')
    private readonly organizationRepository: OrganizationRepositoryInterface,
    private readonly organizationFactory: OrganizationFactory,
  ) {}

  public async handler(
    createOrganizationCommand: CreateOrganizationCommand,
  ): Promise<OrganizationM> {
    const organization = this.organizationFactory.createOrganization(
      createOrganizationCommand,
    );
    const account = await this.accountRepository.getAccountById(
      organization.ownerId,
    );
    if (!account.isPresent()) {
      //TODO specify the error in a type of error
      throw new Error('Account not found');
    }
    const createdOrganization =
      await this.organizationRepository.createOrganization(organization);
    return createdOrganization.get();
  }
}
