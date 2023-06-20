import { CreateRepositoryOptions } from '../models/createRepositoryOptions.interface';

export interface CodeVersionManagerServiceInterface {
  createRepository(options: CreateRepositoryOptions): Promise<any>;
  checkIfRepositoryExistsForIntegration(
    name: string,
    integrationId: string,
  ): Promise<boolean>;
  checkIfIntegrationExistsForAccount(accountId: string): Promise<boolean>;
  checkIfIntegrationExistsForOrganization(
    organizationId: string,
  ): Promise<boolean>;
}
