export class IntegrationM {
  constructor(id: string, name: string, desciption: string, type: string) {
    this.id = id;
    this.name = name;
    this.description = desciption;
    this.type = type;
  }

  id: string;
  name: string;
  description: string;
  //If the integration is cloud provider, repo, CI/CD or tasks manager
  type: string;
  createdAt: Date;
  updatedAt: Date;

  public setCreateAt(date: Date): void {
    this.createdAt = date;
  }
}
