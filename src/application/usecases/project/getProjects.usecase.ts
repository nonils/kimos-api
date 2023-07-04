import { Inject, Injectable } from '@nestjs/common';
import {
  OrganizationRepositoryInterface,
  ProjectRepositoryInterface,
} from '../../../domain/ports';
import { ProjectM } from '../../../domain/models';

@Injectable()
export class GetProjectsUsecase {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepositoryInterface,
    @Inject('OrganizationRepository')
    private readonly organizationRepository: OrganizationRepositoryInterface,
  ) {}

  public async handler(
    page: number,
    size: number,
    accountId: string,
  ): Promise<ProjectM[]> {
    const organizationIds =
      await this.organizationRepository.getOrganizationsByAccountId(accountId);
    return this.projectRepository.getAllPaginatedByAccountAndOrganizations(
      page,
      size,
      accountId,
      organizationIds.map((organization) => organization.id),
    );
  }
}
