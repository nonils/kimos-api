import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Page, ProjectM } from '../../domain/models';
import { CreateProjectUsecase } from '../../application/usecases/project/createProject.usecase';
import CreateProjectCommand from '../../application/commands/project/createProject.command';
import { GetProjectsUsecase } from '../../application/usecases/project/getProjects.usecase';
import ProjectFactory from '../../application/factory/project.factory';
import { GetProjectByIdUsecase } from '../../application/usecases/project/getProjectById.usecase';
import { ApplicationM } from '../../domain/models/application.model';
import { GetApplicationsByProjectIdUsecase } from '../../application/usecases/project/getApplicationsByProjectId.usecase';

@Controller('/api/v1/projects')
export default class ProjectController {
  constructor(
    private readonly projectFactory: ProjectFactory,
    private readonly createProjectUsecase: CreateProjectUsecase,
    private readonly getProjectsUsecase: GetProjectsUsecase,
    private readonly getProjectByIdUsecase: GetProjectByIdUsecase,
    private readonly getApplicationsByProjectIdUsecase: GetApplicationsByProjectIdUsecase,
  ) {}

  @Get('/')
  public async getProjects(
    @Req() request,
    @Query('page') page = 0,
    @Query('size') size = 10,
  ): Promise<Page<ProjectM>> {
    return this.getProjectsUsecase.handler(page, size, request.auth.accountId);
  }

  @Get('/:projectId')
  public async getProject(@Req() request): Promise<ProjectM> {
    return this.getProjectByIdUsecase.handler(
      request.params.projectId,
      request.auth.accountId,
    );
  }

  @Post('')
  public async createProject(
    @Req() request,
    @Body() createProjectCommand: CreateProjectCommand,
  ): Promise<ProjectM> {
    const project = this.projectFactory.createProject(createProjectCommand);
    project.createdBy = request.auth.accountId;
    return this.createProjectUsecase.handler(project);
  }

  @Get('/:projectId/applications')
  public async getApplicationsByProjectId(
    @Req() request,
    @Param('projectId') projectId: string,
    @Query('page') page = 0,
    @Query('size') size = 10,
  ): Promise<Page<ApplicationM>> {
    return this.getApplicationsByProjectIdUsecase.handler(
      projectId,
      request.auth.accountId,
      page,
      size,
    );
  }
}
