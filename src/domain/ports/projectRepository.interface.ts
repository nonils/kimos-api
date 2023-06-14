import { Optional } from 'typescript-optional';
import { ProjectM } from '../models/project.model';

export interface ProjectRepositoryInterface {
  /**
   *
   */
  getAll(): Promise<ProjectM[]>;

  /**
   * Returns Projects filtered by id
   * @returns a `Project` object containing the data.
   * @param id
   */
  getProject(id: string): Promise<Optional<ProjectM>>;

  /**
   *
   */
  createProject(project: ProjectM): Promise<Optional<ProjectM>>;

  /**
   *
   */
  deleteProject(projectId: string): Promise<Optional<ProjectM>>;

  /**
   *
   */
  updateProject(project: ProjectM): Promise<Optional<ProjectM>>;

  /**
   *
   */
  findByOwner(ownerId: string): Promise<ProjectM[]>;

  findByOwnerAndName(ownerId: string, name: string): Promise<ProjectM[]>;
}
