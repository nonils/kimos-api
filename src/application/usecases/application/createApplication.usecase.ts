import { Inject, Injectable } from '@nestjs/common';
import {
  AccountRepositoryInterface,
  ProjectRepositoryInterface,
  TemplateImplementationRepositoryInterface,
  ApplicationRepositoryInterface,
} from '../../../domain/ports';
import {
  ApplicationM,
  ApplicationStatus,
  ProjectType,
} from '../../../domain/models';

@Injectable()
export class CreateApplicationUsecase {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: AccountRepositoryInterface,
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepositoryInterface,
    @Inject('ApplicationRepository')
    private readonly applicationRepository: ApplicationRepositoryInterface,
    @Inject('TemplateImplementationRepository')
    private readonly templateImplementationRepository: TemplateImplementationRepositoryInterface,
  ) {}

  public async handler(applicationModel: ApplicationM): Promise<ApplicationM> {
    const [optAccount, optProject, optTemplateImplementation] =
      await Promise.all([
        this.accountRepository.getAccountById(applicationModel.createdBy),
        this.projectRepository.getProject(applicationModel.projectId),
        this.templateImplementationRepository.findTemplateImplementationById(
          applicationModel.templateImplementationId,
        ),
      ]);
    if (!optAccount.isPresent()) {
      throw new Error('Account not found');
    }
    if (!optProject.isPresent()) {
      throw new Error('Project not found');
    }
    if (!optTemplateImplementation.isPresent()) {
      throw new Error('Template implementation not found');
    }
    const isOrganizationProject =
      optProject.get().type === ProjectType.ORGANIZATION;
    applicationModel.status = isOrganizationProject
      ? this.canCreateApplicationOrg()
      : this.canCreateApplicationPersonal();
    const optApplication = await this.applicationRepository.createApplication(
      applicationModel,
    );
    return optApplication.get();
  }

  //TODO - Implementar
  private canCreateApplicationOrg(): ApplicationStatus {
    return ApplicationStatus.WAITING_FOR_INTEGRATIONS;
  }

  private canCreateApplicationPersonal(): ApplicationStatus {
    return ApplicationStatus.WAITING_FOR_INTEGRATIONS;
  }
}
