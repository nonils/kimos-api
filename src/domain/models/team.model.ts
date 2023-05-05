export class TeamM {
  id: string;

  name: string;

  imageUrl: string;

  description: string;

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
