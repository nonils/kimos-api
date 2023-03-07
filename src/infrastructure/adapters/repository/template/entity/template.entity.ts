import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TemplateEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  // @ManyToMany(() => TechnologyEntity)
  // technologies: TechnologyEntity[];
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}
