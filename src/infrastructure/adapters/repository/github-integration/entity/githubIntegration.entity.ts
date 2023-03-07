import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('github_integration')
export class GithubIntegrationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'account_id' })
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
