import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TemplateEntity } from '../../template/entity/template.entity';

@Entity()
export class TechnologyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  // @ManyToMany(() => TemplateEntity, (template) => template.technologies)
  // templates: TemplateEntity[];
}
