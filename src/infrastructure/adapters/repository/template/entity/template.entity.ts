import { Document } from 'mongoose';

export interface TemplateEntity extends Document {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  createdAt: Date;
  updatedAt: Date;
}
