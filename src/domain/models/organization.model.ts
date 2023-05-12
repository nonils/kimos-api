export class OrganizationM {
  id: string;

  email: string;

  name: string;

  imageUrl: string;

  ownerId: string;

  description: string;
  url: string;

  isDeleted: boolean;

  billingEmail: string;

  plan: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;

  setCreateAt(date: Date) {
    this.createdAt = date;
  }
  setUpdatedAt(date: Date) {
    this.updatedAt = date;
  }
}
