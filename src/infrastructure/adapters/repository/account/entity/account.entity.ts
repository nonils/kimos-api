import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GithubIntegrationEntity } from '../../github-integration/entity/githubIntegration.entity';
import { OrganizationMemberEntity } from '../../organization-member/entity/organizationMember.entity';
import { OrganizationEntity } from '../../organization/entity/organization.entity';
import { ProjectEntity } from '../../project/entity/project.entity';
import { ApplicationEntity } from '../../application/entity/application.entity';

@Entity({ name: 'Accounts' })
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ name: 'last_name', type: 'varchar', length: 256, nullable: true })
  lastName: string;

  @Column({ name: 'pronouns', type: 'varchar', length: 32, nullable: true })
  pronouns: string;

  @Column({ name: 'external_id', type: 'varchar', length: 64, nullable: false })
  externalId: string;

  @Column({ name: 'image_url', type: 'varchar', length: 256, nullable: true })
  imageUrl: string;

  @Column({ name: 'bio', type: 'varchar', length: 512, nullable: true })
  bio: string;

  @Column({ name: 'last_login', type: 'timestamp', nullable: true })
  lastLogin: Date;

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

  @OneToMany(
    () => GithubIntegrationEntity,
    (githubIntegration) => githubIntegration.account,
    {
      eager: false,
    },
  )
  githubIntegrations: GithubIntegrationEntity[];

  @OneToMany(
    () => OrganizationMemberEntity,
    (organizationMember) => organizationMember.account,
    {
      eager: false,
    },
  )
  organizationMemberships: OrganizationMemberEntity[];

  @OneToMany(() => OrganizationEntity, (organization) => organization.owner, {
    eager: false,
  })
  organizations: OrganizationEntity[];
  @OneToMany(() => ProjectEntity, (projects) => projects.account, {
    eager: false,
  })
  projects: ProjectEntity[];
  @OneToMany(
    () => ApplicationEntity,
    (applications) => applications.createdBy,
    {
      eager: false,
    },
  )
  applications: ApplicationEntity[];
}
