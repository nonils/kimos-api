import { Inject } from '@nestjs/common';
import { ProjectM } from 'domain/models';
import {
  AccountRepositoryInterface,
  OrganizationRepositoryInterface,
  ProjectRepositoryInterface,
} from 'domain/ports';

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
    return undefined;
  }
}
