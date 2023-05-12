import { Optional } from 'typescript-optional';
import { IntegrationM } from '../models/integration.model';

export interface IntegrationRepositoryInterface {
  /**
   *
   */
  getAll(): Promise<IntegrationM[]>;

  /**
   * Returns GithubIntegration filtered by id
   * @returns a `GithubIntegration` object containing the data.
   * @param id
   */
  getIntegration(id: string): Promise<Optional<IntegrationM>>;

  /**
   *
   */
  createIntegration(
    githubIntegration: IntegrationM,
  ): Promise<Optional<IntegrationM>>;

  /**
   *
   */
  deleteIntegration(integrationId: string): Promise<Optional<IntegrationM>>;

  /**
   *
   */
  updateIntegration(integration: IntegrationM): Promise<Optional<IntegrationM>>;
}
