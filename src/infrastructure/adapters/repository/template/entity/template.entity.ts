import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { TechnologyEntity } from '../../technology/entity/technology.entity';
import { TemplateFieldEntity } from './templateField.entity';
import { TemplateImplementationEntity } from './templateImplementation.entity';
@Entity({ name: 'Templates' })
export class TemplateEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;
  @Column({
    name: 'description',
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  description: string;
  @ManyToMany(() => TechnologyEntity, (technology) => technology.templates, {
    eager: false,
  })
  @JoinTable({
    name: 'Template_Technologies',
    joinColumn: {
      name: 'template_id',
    },
    inverseJoinColumn: {
      name: 'technology_id',
    },
  })
  technologies: TechnologyEntity[];
  @ManyToMany(
    () => TemplateFieldEntity,
    (templateField) => templateField.template,
    {
      eager: false,
    },
  )
  templateFields: TemplateFieldEntity[];
  @OneToMany(
    () => TemplateImplementationEntity,
    (templateImplementationEntity) => templateImplementationEntity.template,
    {
      eager: false,
    },
  )
  templateImplementations: TemplateImplementationEntity[];

  @Column({
    name: 'template_url',
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  templateUrl: string;
  @Column({
    name: 'template_image_url',
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  templateImageUrl: string;
  @Column({
    name: 'is_deleted',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isDeleted: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'now()',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'now()',
  })
  updatedAt: Date;
  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;
}
