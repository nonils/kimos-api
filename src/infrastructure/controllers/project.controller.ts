import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ProjectM } from '../../domain/models';
import { CreateProjectUsecase } from '../../application/usecases/project/createProject.usecase';
import CreateProjectCommand from '../../application/commands/project/createProject.command';
import ProjectMapper from '../mapper/project.mapper';
import { GetProjectsUsecase } from '../../application/usecases/project/getProjects.usecase';
import ProjectFactory from '../../application/factory/project.factory';

@Controller('/api/v1/projects')
export default class ProjectController {
  constructor(
    private readonly projectFactory: ProjectFactory,
    private readonly createProjectUsecase: CreateProjectUsecase,
    private readonly getProjectsUsecase: GetProjectsUsecase,
  ) {}

  @Get('/')
  public async getProjects(
    @Req() request,
    @Query('page') page = 0,
    @Query('size') size = 10,
  ): Promise<ProjectM[]> {
    return this.getProjectsUsecase.handler(page, size, request.auth.accountId);
  }

  @Get('/:projectId')
  public async getProject(@Req() request): Promise<ProjectM> {
    return undefined;
  }

  @Post('')
  public async createProject(
    @Req() request,
    @Body() createProjectCommand: CreateProjectCommand,
  ): Promise<ProjectM> {
    const project = this.projectFactory.createProject(createProjectCommand);
    project.createdBy = request.auth.accountId;
    return this.createProjectUsecase.handler(
      project,
      createProjectCommand.templateImplementationId,
    );
  }
}
