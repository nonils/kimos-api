import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { AccountEntity } from '../../account/entity/account.entity';
import { ProjectType } from '../../../../../domain/models/projectType.enum';
import { OrganizationEntity } from '../../organization/entity/organization.entity';
import { TemplateInstanceEntity } from '../../template/entity/templateInstance.entity';

@Entity()
export class ProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    name: 'name',
    unique: false,
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;
  @RelationId((project: ProjectEntity) => project.account)
  accountId: string;
  @ManyToMany(() => AccountEntity, (account) => account.projects, {
    eager: false,
  })
  @JoinColumn({
    name: 'account_id',
    referencedColumnName: 'id',
  })
  account: AccountEntity;
  @RelationId((project: ProjectEntity) => project.organization)
  organizationId: string;
  @ManyToMany(
    () => OrganizationEntity,
    (organization) => organization.projects,
    {
      eager: false,
    },
  )
  organization: OrganizationEntity;
  @OneToMany(
    () => TemplateInstanceEntity,
    (templateInstance) => templateInstance.project,
    {
      eager: false,
    },
  )
  templateInstances: TemplateInstanceEntity[];
  @Column({
    name: 'description',
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  description: string;
  @Column({
    name: 'type',
    type: 'enum',
    enum: ProjectType,
    default: ProjectType.PERSONAL,
    nullable: false,
  })
  type: ProjectType;
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
