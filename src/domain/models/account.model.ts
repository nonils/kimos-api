export class AccountM {
  id: string;

  email: string;

  name: string;

  lastName: string;

  pronouns: string;

  externalId: string;

  imageUrl: string;

  bio: string;

  lastLogin: Date;

  isDeleted: boolean;

  createdAt: Date;

  updatedAt: Date;
  setCreateAt(date: Date) {
    this.createdAt = date;
  }
  setUpdatedAt(date: Date) {
    this.updatedAt = date;
  }
}
