export class TemplateFieldM {
  constructor(
    id: string,
    templateFieldId: string,
    templateInstanceId: string,
    value: any,
  ) {
    this.id = id;
    this.templateFieldId = templateFieldId;
    this.templateInstanceId = templateInstanceId;
    this.value = value;
  }
  id: string;
  templateFieldId: string;
  templateInstanceId: string;
  value: any;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  setCreateAt(date: Date) {
    this.createdAt = date;
  }
}
