import { Optional } from 'typescript-optional';
import { ApplicationM } from '../models';

export interface ApplicationRepositoryInterface {
  createApplication(
    templateImplementation: ApplicationM,
  ): Promise<Optional<ApplicationM>>;

  getApplicationsByProjectId(
    projectId: string,
    page: number,
    pageSize: number,
  ): Promise<ApplicationM[]>;

  countApplicationsByProjectId(projectId: string): Promise<number>;
}
