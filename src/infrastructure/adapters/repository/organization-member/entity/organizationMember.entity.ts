import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { AccountEntity } from '../../account/entity/account.entity';
import { OrganizationEntity } from '../../organization/entity/organization.entity';

@Entity()
export class OrganizationMemberEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @RelationId(
    (organizationMemberEntity: OrganizationMemberEntity) =>
      organizationMemberEntity.organization,
  )
  organizationId: string;

  @RelationId(
    (organizationMemberEntity: OrganizationMemberEntity) =>
      organizationMemberEntity.account,
  )
  accountId: string;

  @ManyToOne(
    () => AccountEntity,
    (account) => account.organizationMemberships,
    {
      eager: false,
    },
  )
  @JoinColumn({
    name: 'account_id',
    referencedColumnName: 'id',
  })
  account: AccountEntity;
  @ManyToOne(
    () => OrganizationEntity,
    (organization) => organization.organizationMembers,
    {
      eager: false,
    },
  )
  @JoinColumn({
    name: 'organization_id',
    referencedColumnName: 'id',
  })
  organization: OrganizationEntity;
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
}
