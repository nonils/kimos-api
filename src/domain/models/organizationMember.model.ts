export class OrganizationMemberM {
  id: string;

  organizationId: string;

  accountId: string;

  role: string;

  accountName: string;

  accountEmail: string;

  accountLastName: string;

  createdAt: Date;

  updatedAt: Date;
  setCreateAt(date: Date) {
    this.createdAt = date;
  }
  setUpdatedAt(date: Date) {
    this.updatedAt = date;
  }
}
