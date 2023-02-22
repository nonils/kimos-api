export class GithubIntegrationM {
  constructor(id: string, userId: string, githubInstallationId: string) {
    this.id = id;
    this.userId = userId;
    this.githubInstallationId = githubInstallationId;
  }

  id: string;
  userId: string;
  githubInstallationId: string;
  createdAt: Date;
  updatedAt: Date;

  setCreateAt(date: Date) {
    this.createdAt = date;
  }
  setUpdatedAt(date: Date) {
    this.updatedAt = date;
  }
}
