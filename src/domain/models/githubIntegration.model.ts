export class GithubIntegrationM {
  constructor(id: string, accountId: string, githubInstallationId: string) {
    this.id = id;
    this.accountId = accountId;
    this.githubInstallationId = githubInstallationId;
  }
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

  setCreateAt(date: Date) {
    this.createdAt = date;
  }

  setUpdatedAt(date: Date) {
    this.updatedAt = date;
  }
}
