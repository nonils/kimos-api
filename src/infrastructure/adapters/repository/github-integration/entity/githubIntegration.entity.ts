import { Document } from 'mongoose';

export interface GithubIntegrationEntity extends Document {
  id: string;
  accountId: string;
  githubInstallationId: string;
  targetType: string;
  targetId: string;
  lastGithubUpdated: Date;
  githubAccountLogin: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
