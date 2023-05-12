import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ProjectM } from 'domain/models/project.model';
import { CreateProjectUsecase } from '../../application/usecases/project/createProject.usecase';
import CreateProjectCommand from '../../application/commands/project/createProject.command';
import ProjectMapper from '../mapper/project.mapper';

@Controller('/api/v1/projects')
export default class ProjectController {
  constructor(private readonly createProjectUsecase: CreateProjectUsecase) {}

  @Get('/')
  public async getProjects(@Req() request): Promise<ProjectM[]> {
    return undefined;
  }

  @Get('/:projectId')
  public async getProject(@Req() request): Promise<ProjectM> {
    return undefined;
  }

  @Post('')
  public async createProject(
    @Req() request,
    @Body() projectCommand: CreateProjectCommand,
  ): Promise<ProjectM> {
    const project =
      ProjectMapper.toDomainFromCreateProjectCommand(projectCommand);
    project.createdBy = request.auth.accountId;
    return this.createProjectUsecase.handler(project);
  }
}
