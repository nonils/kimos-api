export class ProjectM {
  constructor(
    id: string,
    name: string,
    owner: string,
    description: string,
    type: string,
    integrations: string[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.description = description;
    this.type = type;
    this.integrations = integrations;
  }

  id: string;
  name: string;
  owner: string;
  description: string;
  type: string;
  integrations: string[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date;

  setCreateAt(date: Date) {
    this.createdAt = date;
  }
}
