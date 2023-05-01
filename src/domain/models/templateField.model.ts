export class TemplateFieldM {
  constructor(
    id: string,
    fieldName: string,
    fieldType: string,
    templateId: string,
    fieldLabel: string,
    fieldPlaceholder: string,
    isRequired: boolean,
    isDeleted: boolean,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.fieldName = fieldName;
    this.fieldType = fieldType;
    this.templateId = templateId;
    this.fieldLabel = fieldLabel;
    this.fieldPlaceholder = fieldPlaceholder;
    this.isRequired = isRequired;
    this.isDeleted = isDeleted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  id: string;
  fieldName: string;
  templateId: string;
  fieldType: string;
  fieldLabel: string;
  fieldPlaceholder: string;
  isRequired: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;

  setCreateAt(date: Date) {
    this.createdAt = date;
  }
}
