import { Inject } from '@nestjs/common';
import {
  AccountRepositoryInterface,
  OrganizationRepositoryInterface,
  ProjectRepositoryInterface,
  TemplateImplementationRepositoryInterface,
} from '../../../domain/ports';
import { CodeVersionManagerServiceFactory } from '../../../infrastructure/adapters/factories/codeVersionManagerService.factory';
import { ApplicationRepositoryInterface } from '../../../domain/ports/applicationRepository.interface';
import { ProjectM } from '../../../domain/models';

export class CreateProjectUsecase {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepositoryInterface,
    @Inject('AccountRepository')
    private readonly accountRepository: AccountRepositoryInterface,
    @Inject('OrganizationRepository')
    private readonly organizationRepository: OrganizationRepositoryInterface,
    @Inject('TemplateImplementationRepository')
    private readonly templateImplementationRepository: TemplateImplementationRepositoryInterface,
    @Inject('ApplicationRepository')
    private readonly applicationRepository: ApplicationRepositoryInterface,
    private readonly codeVersionManagerFactory: CodeVersionManagerServiceFactory,
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
      //TODO replace for a custom exception
      throw new Error('A project exists with the same name');
    }
    const optProject = await this.projectRepository.createProject(project);
    //await this.queueService.sendProjectCreatedEvent(optProject.get());
    return optProject.get();
  }
}
