export class TemplateM {
  constructor(
    id: string,
    name: string,
    description: string,
    technologies: string[] = [],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.technologies = technologies;
  }

  id: string;
  name: string;
  technologies: string[];
  description: string;
  createdAt: Date;

  setCreateAt(date: Date) {
    this.createdAt = date;
  }
}
