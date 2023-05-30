import { TemplateImplementationM } from '../models';

export interface TemplateImplementationRepository {
  getAllTemplateImplementationsByTemplateId(
    id: string,
  ): Promise<TemplateImplementationM[]>;
}
