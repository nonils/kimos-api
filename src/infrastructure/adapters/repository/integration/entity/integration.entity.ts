import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TechnologyEntity } from '../../technology/entity/technology.entity';
import { ProjectEntity } from '../../project/entity/project.entity';

@Entity()
export class IntegrationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  type: string;
  @ManyToMany(() => ProjectEntity, (project) => project.integrations)
  projects: ProjectEntity[];
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}
