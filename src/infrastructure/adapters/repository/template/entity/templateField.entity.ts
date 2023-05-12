import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { TemplateEntity } from './template.entity';
import { FieldType } from '../../../../../domain/models/fieldType.enum';

@Entity({
  name: 'Template_Fields',
})
export class TemplateFieldEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  fieldName: string;
  @Column({
    name: 'field_type',
    type: 'enum',
    enum: FieldType,
    nullable: false,
  })
  fieldType: FieldType;
  @Column({ name: 'field_label', type: 'varchar', length: 100, nullable: true })
  fieldLabel: string;
  @Column({
    name: 'field_placeholder',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  fieldPlaceholder: string;
  @Column({
    name: 'is_required',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isRequired: boolean;
  @ManyToOne(() => TemplateEntity, (template) => template.templateFields, {
    onDelete: 'CASCADE',
    eager: false,
    nullable: false,
  })
  @JoinColumn({ name: 'template_id' })
  template: TemplateEntity;
  @RelationId((templateField: TemplateFieldEntity) => templateField.template)
  templateId: string;
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
