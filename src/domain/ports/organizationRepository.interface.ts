import { OrganizationM } from '../models';
import { Optional } from 'typescript-optional';

export interface OrganizationRepositoryInterface {
  getAll(): Promise<OrganizationM[]>;
  getOrganizationById(id: string): Promise<Optional<OrganizationM>>;
  getOrganizationsByAccountId(accountId: string): Promise<OrganizationM[]>;
  createOrganization(
    organizationModel: OrganizationM,
  ): Promise<Optional<OrganizationM>>;
  updateOrganization(
    OrganizationModel: OrganizationM,
  ): Promise<Optional<OrganizationM>>;
  disableOrganization(id: string): Promise<OrganizationM>;
  deleteOrganization(id: string): Promise<OrganizationM>;
  getOrganizationsByAccount(accountId: string);
}
