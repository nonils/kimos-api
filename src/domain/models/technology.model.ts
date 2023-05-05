export class TechnologyM {
  constructor(id: string, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  id: string;
  name: string;
  description: string;
  createdAt: Date;

  setCreateAt(date: Date) {
    this.createdAt = date;
  }
}
