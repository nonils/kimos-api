import { Inject } from '@nestjs/common';
import { ProjectM } from '../../../domain/models';
import {
  AccountRepositoryInterface,
  OrganizationRepositoryInterface,
  ProjectRepositoryInterface,
} from '../../../domain/ports';

export class CreateProjectUsecase {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepositoryInterface,
    @Inject('AccountRepository')
    private readonly accountRepository: AccountRepositoryInterface,
    @Inject('OrganizationRepository')
    private readonly organizationRepository: OrganizationRepositoryInterface,
  ) {}

  public async handler(project: ProjectM): Promise<ProjectM> {
    const [optAccount, projectByOwner] = await Promise.all([
      this.accountRepository.getAccountById(project.createdBy),
      this.projectRepository.findByOwnerAndName(
        project.createdBy,
        project.name,
      ),
    ]);
    if (optAccount.isEmpty()) {
      //TODO replace for a custom exception
      throw new Error('Account not found');
    }
    if (projectByOwner.length > 0) {
      throw new Error('A project exists with the same name');
    }
    const optProject = await this.projectRepository.createProject(project);
    return optProject.get();
  }
}
