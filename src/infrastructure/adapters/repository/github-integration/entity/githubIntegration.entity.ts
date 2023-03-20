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

@Entity('Github_Integrations')
export class GithubIntegrationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => AccountEntity, (account) => account.githubIntegrations, {
    eager: false,
  })
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;

  @RelationId(
    (githubIntegration: GithubIntegrationEntity) => githubIntegration.account,
  )
  accountId: string;
  @Column({ name: 'github_installation_id' })
  githubInstallationId: string;
  @Column({ name: 'target_type' })
  targetType: string;
  @Column({ name: 'target_id' })
  targetId: string;
  @Column({ name: 'last_github_updated' })
  lastGithubUpdated: Date;
  @Column({ name: 'github_account_login' })
  githubAccountLogin: string;
  @Column({ name: 'is_deleted' })
  isDeleted: boolean;
  @Column({ name: 'created_at' })
  createdAt: Date;
  @Column({ name: 'updated_at' })
  updatedAt: Date;
}
