export class ApplicationM {
  constructor(
    id: string,
    name: string,
    githubRepositoryName: string,
    appTemplateId: string,
    appTemplateVersion: string,
  ) {
    this.id = id;
    this.name = name;
    this.githubRepositoryName = githubRepositoryName;
    this.appTemplateId = appTemplateVersion;
    this.appTemplateVersion = appTemplateVersion;
  }

  id: string;
  name: string;
  githubRepositoryName: string;
  appTemplateId: string;
  appTemplateVersion: string;
  createdAt: Date;
  updatedAt: Date;

  setCreateAt(date: Date) {
    this.createdAt = date;
  }
  setUpdatedAt(date: Date) {
    this.updatedAt = date;
  }
}
