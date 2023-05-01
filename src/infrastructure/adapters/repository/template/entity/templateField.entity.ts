import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TechnologyEntity } from '../../technology/entity/technology.entity';
import { TemplateEntity } from './template.entity';

@Entity()
export class TemplateFieldEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  fieldName: string;
  @Column()
  fieldType: string;
  @Column()
  fieldLabel: string;
  @Column()
  fieldPlaceholder: string;
  @Column()
  isRequired: boolean;
  @ManyToOne(() => TemplateEntity)
  template: TemplateEntity;
  @Column()
  createdAt: Date;
  @Column()
  isDeleted: boolean;
  @Column()
  updatedAt: Date;
  @Column()
  deletedAt: Date;
}
