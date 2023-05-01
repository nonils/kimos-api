export class IntegrationInstanceM {
  constructor(
    id: string,
    integrationId: string,
    integrationName: string,
    projectId: string,
  ) {
    this.id = id;
    this.integrationId = integrationId;
    this.projectId = projectId;
    this.integrationName = integrationName;
  }
  id: string;
  integrationId: string;
  integrationName: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;

  setCreateAt(date: Date) {
    this.createdAt = date;
  }

  setUpdatedAt(date: Date) {
    this.updatedAt = date;
  }

  setIsDeleted(isDeleted: boolean) {
    this.isDeleted = isDeleted;
  }
}
