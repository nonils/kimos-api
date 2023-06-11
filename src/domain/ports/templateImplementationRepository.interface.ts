import { TemplateImplementationM } from '../models';

export interface TemplateImplementationRepositoryInterface {
  getAllTemplateImplementationsByTemplateId(
    id: string,
  ): Promise<TemplateImplementationM[]>;
}
