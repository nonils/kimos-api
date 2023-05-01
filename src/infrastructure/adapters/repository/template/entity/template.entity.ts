import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TechnologyEntity } from '../../technology/entity/technology.entity';

@Entity()
export class TemplateEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @ManyToMany(() => TechnologyEntity)
  technologies: TechnologyEntity[];
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column()
  templateUrl: string;
}
