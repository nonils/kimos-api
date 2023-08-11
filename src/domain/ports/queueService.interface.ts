import { ProjectM } from '../models';

export interface IQueueService {
  sendProjectCreatedEvent: (project: ProjectM) => Promise<void>;
}
