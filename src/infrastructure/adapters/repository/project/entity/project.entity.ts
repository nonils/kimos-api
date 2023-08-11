import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { AccountEntity } from '../../account/entity/account.entity';
import { ProjectType } from '../../../../../domain/models';
import { OrganizationEntity } from '../../organization/entity/organization.entity';
import { ApplicationEntity } from '../../application/entity/application.entity';

@Entity({ name: 'Projects' })
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

  // Relations
  @RelationId((project: ProjectEntity) => project.account)
  accountId: string;
  @ManyToOne(() => AccountEntity, (account) => account.projects, {
    eager: false,
  })
  @JoinColumn({
    name: 'account_id',
    referencedColumnName: 'id',
  })
  account: AccountEntity;

  @RelationId((project: ProjectEntity) => project.createdBy)
  createdById: string;

  @ManyToOne(() => AccountEntity, (account) => account.projects, {
    eager: false,
  })
  @JoinColumn({
    name: 'created_by',
    referencedColumnName: 'id',
  })
  createdBy: AccountEntity;
  @RelationId((project: ProjectEntity) => project.organization)
  organizationId: string;
  @ManyToOne(
    () => OrganizationEntity,
    (organization) => organization.projects,
    {
      eager: false,
    },
  )
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'id',
  })
  organization: OrganizationEntity;
  @OneToOne(
    () => ApplicationEntity,
    (templateInstance) => templateInstance.project,
    {
      eager: false,
    },
  )
  templateInstance: ApplicationEntity;
}
