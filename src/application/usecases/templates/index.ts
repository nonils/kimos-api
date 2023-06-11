import GetAllTemplatesUseCase from './getAllTemplates.usecase';
import CreateTemplateUseCase from './createTemplate.usecase';
import { GetAllTemplateImplementationsUseCase } from './getAllTemplateImplementations.usecase';

export const TEMPLATES_USECASES = [
  GetAllTemplatesUseCase,
  CreateTemplateUseCase,
  GetAllTemplateImplementationsUseCase,
];
