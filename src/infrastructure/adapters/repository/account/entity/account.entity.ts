import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GithubIntegrationEntity } from '../../github-integration/entity/githubIntegration.entity';

@Entity({ name: 'Accounts' })
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 256, nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  pronouns: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  external_id: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  image_url: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  bio: string;

  @Column({ type: 'timestamp', nullable: true })
  last_login: Date;

  @Column({ type: 'boolean', nullable: false, default: false })
  is_deleted: boolean;

  @Column({ type: 'timestamp', nullable: false, default: () => 'now()' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: false, default: () => 'now()' })
  updated_at: Date;

  @OneToMany(
    () => GithubIntegrationEntity,
    (githubIntegration) => githubIntegration.account,
    {
      eager: false,
    },
  )
  githubIntegrations: GithubIntegrationEntity[];
}
