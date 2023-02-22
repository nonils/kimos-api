import { GithubIntegrationM } from '../models';
import { Optional } from 'typescript-optional';

export interface GithubIntegrationRepositoryInterface {
  /**
   *
   */
  getAll(): Promise<GithubIntegrationM[]>;

  /**
   * Returns GithubIntegration filtered by id
   * @returns a `GithubIntegration` object containing the data.
   * @param id
   */
  getGithubIntegration(id: string): Promise<Optional<GithubIntegrationM>>;

  /**
   *
   */
  createGithubIntegration(
    githubIntegration: GithubIntegrationM,
  ): Promise<Optional<GithubIntegrationM>>;

  /**
   *
   */
  deleteGithubIntegration(
    githubIntegrationId: string,
  ): Promise<Optional<GithubIntegrationM>>;

  /**
   *
   */
  updateGithubIntegration(
    githubIntegrationId: string,
    githubIntegration: GithubIntegrationM,
  ): Promise<Optional<GithubIntegrationM>>;
}
