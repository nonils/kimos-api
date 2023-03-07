import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GithubIntegrationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  accountId: string;
  @Column()
  githubInstallationId: string;
  @Column()
  targetType: string;
  @Column()
  targetId: string;
  @Column()
  lastGithubUpdated: Date;
  @Column()
  githubAccountLogin: string;
  @Column()
  isDeleted: boolean;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}
