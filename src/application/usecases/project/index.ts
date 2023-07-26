import { CreateProjectUsecase } from './createProject.usecase';
import { GetProjectsUsecase } from './getProjects.usecase';
import { GetProjectByIdUsecase } from './getProjectById.usecase';

export const PROJECT_USECASES = [
  CreateProjectUsecase,
  GetProjectsUsecase,
  GetProjectByIdUsecase,
];
