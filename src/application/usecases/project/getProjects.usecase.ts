import { Inject, Injectable } from '@nestjs/common';
import {
  OrganizationRepositoryInterface,
  ProjectRepositoryInterface,
} from '../../../domain/ports';
import { Page, ProjectM } from '../../../domain/models';

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
  ): Promise<Page<ProjectM>> {
    const organizations =
      await this.organizationRepository.getOrganizationsByAccountId(accountId);
    const organizationIds = organizations.map(
      (organization) => organization.id,
    );
    const [projects, countOfProjects] = await Promise.all([
      this.projectRepository.getAllPaginatedByAccountAndOrganizations(
        page,
        size,
        accountId,
        organizationIds,
      ),
      this.projectRepository.countProjectsByAccountAndOrganizations(
        accountId,
        organizationIds,
      ),
    ]);
    return new Page<ProjectM>(projects, page, size, countOfProjects);
  }
}
