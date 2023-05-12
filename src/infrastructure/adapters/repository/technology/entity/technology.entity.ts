import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TemplateEntity } from '../../template/entity/template.entity';
import { TechnologyType } from '../../../../../domain/models/technologyType.enum';

@Entity({
  name: 'Technologies',
})
export class TechnologyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;
  @Column({ name: 'name', type: 'varchar', length: 512, nullable: true })
  description: string;
  @Column({ name: 'name', type: 'varchar', length: 100, nullable: true })
  type: TechnologyType;
  @ManyToMany(() => TemplateEntity, (template) => template.technologies, {
    eager: false,
  })
  templates: TemplateEntity[];
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
