export class CICDProviderM {
  id: string;
  name: string;
  logo: string;
  url: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(
    id: string,
    name: string,
    logo: string,
    url: string,
    isDeleted: boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.logo = logo;
    this.url = url;
    this.isDeleted = isDeleted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
