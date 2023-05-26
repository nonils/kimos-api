export class TemplateM {
  constructor(
    id: string,
    name: string,
    description: string,
    templateUrl: string,
    technologies: string[] = [],
    templateImageUrl: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.templateUrl = templateUrl;
    this.templateImageUrl = templateImageUrl;
    this.technologies = technologies;
  }

  id: string;
  name: string;
  templateImageUrl: string;
  technologies: string[];
  templateUrl: string;
  description: string;
  createdAt: Date;

  setCreateAt(date: Date) {
    this.createdAt = date;
  }
}
