import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CICDProviderEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'name', unique: true, nullable: false })
  name: string;
  @Column({ name: 'logo' })
  logo: string;
  @Column({ name: 'url' })
  url: string;
  @Column({ name: 'is_deleted', nullable: false, default: false })
  isDeleted: boolean;
  @Column({ name: 'created_at' })
  createdAt: Date;
  @Column({ name: 'updated_at' })
  updatedAt: Date;
  @Column({ name: 'deleted_at' })
  deletedAt: Date;
}
