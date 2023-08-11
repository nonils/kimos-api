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
import { OrganizationMemberEntity } from '../../organization-member/entity/organizationMember.entity';
import { AccountEntity } from '../../account/entity/account.entity';
import { ProjectEntity } from '../../project/entity/project.entity';
import { PlanType } from '../../../../../domain/models/planType.enum';
import { GithubIntegrationEntity } from '../../github-integration/entity/githubIntegration.entity';

@Entity('Organizations')
export class OrganizationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;
  @Column({ name: 'description', type: 'varchar', length: 512, nullable: true })
  description: string;
  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  email: string;
  @Column({
    name: 'image_url',
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  imageUrl: string;
  @Column({
    name: 'url',
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  url: string;
  @Column({
    name: 'billing_email',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  billingEmail: string;
  @Column({
    name: 'plan',
    type: 'enum',
    enum: PlanType,
    nullable: false,
    default: PlanType.FREE,
  })
  plan: string;
  @Column({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    default: () => 'now()',
  })
  createdAt: Date;
  @Column({
    name: 'is_deleted',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isDeleted: boolean;
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
  @OneToOne(
    () => GithubIntegrationEntity,
    (githubIntegration) => githubIntegration.organization,
    { eager: false },
  )
  githubIntegrations: GithubIntegrationEntity;
  @OneToMany(
    () => OrganizationMemberEntity,
    (organizationMember) => organizationMember.organization,
    {
      eager: false,
    },
  )
  organizationMembers: OrganizationMemberEntity[];
  @OneToMany(() => ProjectEntity, (project) => project.organization, {
    eager: false,
  })
  projects: ProjectEntity[];

  @RelationId((organization: OrganizationEntity) => organization.owner)
  ownerId: string;

  @ManyToOne(() => AccountEntity, (account) => account.organizations, {
    eager: false,
  })
  @JoinColumn({
    name: 'owner_id',
  })
  owner: AccountEntity;
}
