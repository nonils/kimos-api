import { Optional } from 'typescript-optional';
import { ApplicationM } from '../models/application.model';

export interface ApplicationRepositoryInterface {
  createTemplateInstance(
    templateImplementation: ApplicationM,
  ): Promise<Optional<ApplicationM>>;
}
