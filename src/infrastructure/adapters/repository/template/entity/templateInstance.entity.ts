import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TemplateEntity } from './template.entity';
import { ProjectEntity } from '../../project/entity/project.entity';

@Entity()
export class TemplateInstanceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => TemplateEntity)
  template: TemplateEntity;
  @ManyToOne(() => ProjectEntity)
  project: ProjectEntity;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column()
  isDeleted: boolean;
  @Column()
  deletedAt: Date;
}
