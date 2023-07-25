import { ProjectType } from './projectType.enum';

export class ProjectM {
  constructor(
    id: string,
    name: string,
    createdBy: string,
    description: string,
    organizationId: string,
    type: ProjectType,
  ) {
    this.id = id;
    this.name = name;
    this.createdBy = createdBy;
    this.description = description;
    this.organizationId = organizationId;
    this.type = type;
  }

  id: string;
  name: string;
  templateImplementationId: string;
  createdBy: string;
  createdByUser: string;
  organizationId: string;
  organizationName: string;
  description: string;
  type: ProjectType;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt: Date;

  setCreateAt(date: Date) {
    this.createdAt = date;
  }

  setUpdatedAt(date: Date) {
    this.updatedAt = date;
  }

  setDeletedAt(date: Date) {
    this.deletedAt = date;
  }
}
