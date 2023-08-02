import { Inject, Injectable } from '@nestjs/common';
import {
  AccountRepositoryInterface,
  OrganizationRepositoryInterface,
  ProjectRepositoryInterface,
} from '../../../domain/ports';
import { ApplicationM, Page, ProjectM } from '../../../domain/models';
import { ApplicationRepositoryInterface } from '../../../domain/ports/applicationRepository.interface';

@Injectable()
export class GetApplicationsByProjectIdUsecase {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepositoryInterface,
    @Inject('ApplicationRepository')
    private readonly applicationRepository: ApplicationRepositoryInterface,
    @Inject('OrganizationRepository')
    private readonly organizationRepository: OrganizationRepositoryInterface,
  ) {}

  public async handler(
    projectId: string,
    accountId: string,
    page: number,
    size: number,
  ): Promise<Page<ApplicationM>> {
    const project = await this.projectRepository.getProject(projectId);
    if (!project.isPresent()) {
      //TODO change this for specific exceptions
      throw new Error('Project not found');
    }
    const projectBelongsToUser = await this.projectBelongsToUser(
      accountId,
      project.get(),
    );
    if (!projectBelongsToUser) {
      throw new Error('Project not found');
    }
    const [elements, total] = await Promise.all([
      this.applicationRepository.getApplicationsByProjectId(
        projectId,
        page,
        size,
      ),
      this.applicationRepository.countApplicationsByProjectId(projectId),
    ]);
    return new Page<ApplicationM>(elements, page, size, total);
  }

  private async projectBelongsToUser(accountId: string, project: ProjectM) {
    const organizationsThatUserBelongsTo =
      await this.organizationRepository.getOrganizationsByAccountId(accountId);
    const organizationIdsThatUserBelongsTo = organizationsThatUserBelongsTo.map(
      (org) => org.id,
    );
    return (
      project.accountId === accountId ||
      organizationIdsThatUserBelongsTo.includes(project.organizationId)
    );
  }
}
