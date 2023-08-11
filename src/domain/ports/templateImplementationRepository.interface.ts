import { TemplateImplementationM } from '../models';
import { Optional } from 'typescript-optional';

export interface TemplateImplementationRepositoryInterface {
  getAllTemplateImplementationsByTemplateId(
    id: string,
  ): Promise<TemplateImplementationM[]>;

  findTemplateImplementationById(
    id: string,
  ): Promise<Optional<TemplateImplementationM>>;
}
