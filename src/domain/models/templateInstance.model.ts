export class TemplateInstanceM {
  constructor(id: string, templateId: string, projectId: string) {
    this.id = id;
    this.templateId = templateId;
  }

  id: string;
  projectId: string;
  templateId: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;

  setCreateAt(date: Date) {
    this.createdAt = date;
  }
}
