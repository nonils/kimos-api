export class TemplateInstanceM {
  constructor(id: string, templateImplementationId: string, projectId: string) {
    this.id = id;
    this.templateImplementationId = templateImplementationId;
  }

  id: string;
  projectId: string;
  templateImplementationId: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;

  setCreateAt(date: Date) {
    this.createdAt = date;
  }
}
