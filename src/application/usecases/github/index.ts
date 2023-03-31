import InstallGithubAppUsecase from './installGithubApp.usecase';
import ResolveGhInstallationCallbackUsecase from './resolveGhInstallationCallback.usecase';
import CreateGithubRepositoryUsecase from './createGithubRepository.usecase';

export const GITHUB_USECASES = [
  InstallGithubAppUsecase,
  ResolveGhInstallationCallbackUsecase,
  CreateGithubRepositoryUsecase,
];
