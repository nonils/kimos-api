import { Inject } from '@nestjs/common';
import { ProjectM, TemplateImplementationM } from '../../../domain/models';
import {
  AccountRepositoryInterface,
  OrganizationRepositoryInterface,
  ProjectRepositoryInterface,
  TemplateImplementationRepositoryInterface,
} from '../../../domain/ports';
import { CodeVersionManagerServiceFactory } from '../../../infrastructure/adapters/factories/codeVersionManagerService.factory';
import { ProjectState } from '../../../domain/models/projectState.enum';

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
    private readonly codeVersionManagerFactory: CodeVersionManagerServiceFactory,
  ) {}

  public async handler(
    project: ProjectM,
    templateImplementationId: string,
  ): Promise<ProjectM> {
    const [optAccount, projectByOwner, optTemplateImplementation] =
      await Promise.all([
        this.accountRepository.getAccountById(project.createdBy),
        this.projectRepository.findByOwnerAndName(
          project.createdBy,
          project.name,
        ),
        this.templateImplementationRepository.findTemplateImplementationById(
          templateImplementationId,
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
    if (optTemplateImplementation.isEmpty()) {
      //TODO replace for a custom exception
      throw new Error('Template implementation not found');
    }
    let checkRequiredIntegrations;
    if (project.organizationId) {
      checkRequiredIntegrations = this.checkRequiredIntegrationsForOrganization(
        project.organizationId,
        optTemplateImplementation.get(),
      );
    } else {
      checkRequiredIntegrations = this.checkRequiredIntegrationsForAccount(
        project.createdBy,
        optTemplateImplementation.get(),
      );
    }
    const hasAllRequiredIntegrations = await Promise.resolve(
      checkRequiredIntegrations,
    );
    if (!hasAllRequiredIntegrations) {
      project.state = ProjectState.PENDING_OF_COMPLETE_INTEGRATIONS;
    } else {
      project.state = ProjectState.CREATED;
    }
    const optProject = await this.projectRepository.createProject(project);
    //TODO CALL TO A SERVICE QUEUE TO CREATE THE REPOSITORY and all the stuff
    return optProject.get();
  }

  private async checkRequiredIntegrationsForOrganization(
    organizationId: string,
    templateImplementation: TemplateImplementationM,
  ): Promise<boolean> {
    const [codeVersionManagerResult] = await Promise.all([
      this.codeVersionManagerFactory
        .getService(templateImplementation.codeVersionManagerProviderId)
        .checkIfIntegrationExistsForOrganization(organizationId),
    ]);
    return codeVersionManagerResult;
  }

  private async checkRequiredIntegrationsForAccount(
    accountId: string,
    templateImplementation: TemplateImplementationM,
  ): Promise<boolean> {
    const [codeVersionManagerResult] = await Promise.all([
      this.codeVersionManagerFactory
        .getService(templateImplementation.codeVersionManagerProviderId)
        .checkIfIntegrationExistsForAccount(accountId),
    ]);
    return codeVersionManagerResult;
  }
}
