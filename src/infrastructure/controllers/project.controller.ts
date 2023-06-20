import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ProjectM } from '../../domain/models';
import { CreateProjectUsecase } from '../../application/usecases/project/createProject.usecase';
import CreateProjectCommand from '../../application/commands/project/createProject.command';
import ProjectMapper from '../mapper/project.mapper';
import { GetMyProjectsUsecase } from '../../application/usecases/project/getMyProjects.usecase';

@Controller('/api/v1/projects')
export default class ProjectController {
  constructor(
    private readonly createProjectUsecase: CreateProjectUsecase,
    private readonly getMyProjectsUsecase: GetMyProjectsUsecase,
  ) {}

  @Get('/')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getProjects(@Req() request): Promise<ProjectM[]> {
    return undefined;
  }

  @Get('/:projectId')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getProject(@Req() request): Promise<ProjectM> {
    return undefined;
  }

  @Get('/my-projects')
  public async getMyProjects(@Req() request): Promise<ProjectM[]> {
    const accountId = request.auth.accountId;
    return this.getMyProjectsUsecase.handler(accountId);
  }

  @Post('')
  public async createProject(
    @Req() request,
    @Body() createProjectCommand: CreateProjectCommand,
  ): Promise<ProjectM> {
    const project =
      ProjectMapper.toDomainFromCreateProjectCommand(createProjectCommand);
    project.createdBy = request.auth.accountId;
    return this.createProjectUsecase.handler(
      project,
      createProjectCommand.templateImplementationId,
    );
  }
}
