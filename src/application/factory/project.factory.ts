import { Injectable } from '@nestjs/common';
import { ProjectM, ProjectType } from '../../domain/models';
import CreateProjectCommand from '../commands/project/createProject.command';

@Injectable()
export default class ProjectFactory {
  public createProject(createProjectCommand: CreateProjectCommand): ProjectM {
    return new ProjectM(
      undefined,
      createProjectCommand.name,
      undefined,
      createProjectCommand.description,
      null,
      ProjectType.PERSONAL,
    );
  }
}
