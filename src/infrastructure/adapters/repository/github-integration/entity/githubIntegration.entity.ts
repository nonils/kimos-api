import { Document } from 'mongoose';

export interface GithubIntegrationEntity extends Document {
  id: string;
  userId: string;
  githubInstallationId: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
