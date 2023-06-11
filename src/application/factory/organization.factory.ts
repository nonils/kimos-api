import { Injectable } from '@nestjs/common';
import { OrganizationM } from '../../domain/models';
import { CreateOrganizationCommand } from '../commands/organization/createOganization.command';

@Injectable()
export default class OrganizationFactory {
  public createOrganization(
    createOrganizationCommand: CreateOrganizationCommand,
  ): OrganizationM {
    const organization = new OrganizationM();
    organization.name = createOrganizationCommand.name;
    organization.description = createOrganizationCommand.description;
    organization.email = createOrganizationCommand.email;
    organization.billingEmail = createOrganizationCommand.billingEmail;
    organization.url = createOrganizationCommand.url;
    organization.imageUrl = createOrganizationCommand.imageUrl;
    organization.plan = createOrganizationCommand.plan;
    return organization;
  }
}
