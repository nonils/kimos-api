export class TeamMemberModel {
  id: string;

  teamId: string;

  teamMemberId: string;

  accountId: string;

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
