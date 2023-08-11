import { Inject, Injectable } from '@nestjs/common';
import {
  OrganizationRepositoryInterface,
  ProjectRepositoryInterface,
} from '../../../domain/ports';
import { ProjectM } from '../../../domain/models';

@Injectable()
export class GetProjectByIdUsecase {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepositoryInterface,
    @Inject('OrganizationRepository')
    private readonly organizationRepository: OrganizationRepositoryInterface,
  ) {}

  public async handler(
    projectId: string,
    accountId: string,
  ): Promise<ProjectM> {
    const organizations =
      await this.organizationRepository.getOrganizationsByAccountId(accountId);
    const organizationIds = organizations.map(
      (organization) => organization.id,
    );
    const project = await this.projectRepository.getById(projectId);
    if (!project.isPresent()) {
      throw new Error('Project not found');
    }
    if (
      project.get().accountId !== accountId &&
      !organizationIds.includes(project.get().organizationId)
    ) {
      throw new Error('Project not found');
    }
    return project.get();
  }
}
