import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TechnologyEntity } from '../../technology/entity/technology.entity';
import { IntegrationEntity } from '../../integration/entity/integration.entity';
import { AccountEntity } from '../../account/entity/account.entity';

@Entity()
export class ProjectEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @ManyToMany(() => AccountEntity)
  owner: AccountEntity;
  @ManyToMany(() => IntegrationEntity, (integration) => integration.projects)
  integrations: IntegrationEntity[];
  @Column()
  description: string;
  @Column()
  type: string;
  @Column()
  isDeleted: boolean;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
  @Column()
  deletedAt: Date;
}
