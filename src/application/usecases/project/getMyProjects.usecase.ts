import { Inject } from '@nestjs/common';
import { ProjectRepositoryInterface } from '../../../domain/ports';
import { ProjectM } from '../../../domain/models';

export class GetMyProjectsUsecase {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepositoryInterface,
  ) {}

  public async handler(accountId: string): Promise<ProjectM[]> {
    const projects = await this.projectRepository.findByOwner(accountId);
    return projects;
  }
}
