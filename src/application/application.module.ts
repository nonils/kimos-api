import { Module } from '@nestjs/common';
import { DomainModule } from 'domain/domain.module';
import TemplateRepositoryPostgres from '../infrastructure/adapters/repository/template/template.repository.postgres';
import TemplateFactory from './factory/template.factory';
import GithubIntegrationFactory from './factory/githubIntegration.factory';
import { TEMPLATES_USECASES } from './usecases/templates';
import { GITHUB_USECASES } from './usecases/github';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Configuration } from '../config/env.enum';
import GithubIntegrationRepositoryPostgres from '../infrastructure/adapters/repository/github-integration/githubIntegration.repository.postgres';
import GithubClient from '../infrastructure/adapters/client/github/github.client';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from '../infrastructure/adapters/repository/template/entity/template.entity';
import { GithubIntegrationEntity } from '../infrastructure/adapters/repository/github-integration/entity/githubIntegration.entity';
import { ACCOUNT_USECASES } from './usecases/account';
import AccountRepositoryPostgres from '../infrastructure/adapters/repository/account/account.repository.postgres';
import { AccountEntity } from '../infrastructure/adapters/repository/account/entity/account.entity';
import { ORGANIZATION_USECASES } from './usecases/organizations';
import OrganizationRepositoryPostgres from '../infrastructure/adapters/repository/organization/organization.repository.postgres';
import { OrganizationEntity } from '../infrastructure/adapters/repository/organization/entity/organization.entity';
import { ProjectEntity } from '../infrastructure/adapters/repository/project/entity/project.entity';
import OrganizationFactory from './factory/organization.factory';
import { PROJECT_USECASES } from './usecases/project';
import ProjectRepositoryPostgres from '../infrastructure/adapters/repository/project/project.repository.postgres';

@Module({
  imports: [
    DomainModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(Configuration.POSTGRES_HOST),
        port: configService.get(Configuration.POSTGRES_PORT),
        username: configService.get(Configuration.POSTGRES_USER),
        password: configService.get(Configuration.POSTGRES_PASSWORD),
        database: configService.get(Configuration.POSTGRES_DATABASE),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      }),
    }),
    TypeOrmModule.forFeature([
      AccountEntity,
      TemplateEntity,
      GithubIntegrationEntity,
      OrganizationEntity,
      ProjectEntity,
    ]),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          url: `${configService.get(Configuration.REDIS_CONNECTION_STRING)}`,
        },
      }),
    }),
  ],
  providers: [
    TemplateFactory,
    OrganizationFactory,
    GithubIntegrationFactory,
    ...ACCOUNT_USECASES,
    ...GITHUB_USECASES,
    ...TEMPLATES_USECASES,
    ...PROJECT_USECASES,
    ...ORGANIZATION_USECASES,
    { provide: 'AccountRepository', useClass: AccountRepositoryPostgres },
    { provide: 'TemplateRepository', useClass: TemplateRepositoryPostgres },
    {
      provide: 'GithubIntegrationRepository',
      useClass: GithubIntegrationRepositoryPostgres,
    },
    {
      provide: 'OrganizationRepository',
      useClass: OrganizationRepositoryPostgres,
    },
    {
      provide: 'ProjectRepository',
      useClass: ProjectRepositoryPostgres,
    },
    {
      provide: 'GithubClient',
      useClass: GithubClient,
    },
  ],
  exports: [
    TemplateFactory,
    OrganizationFactory,
    ...ACCOUNT_USECASES,
    ...ORGANIZATION_USECASES,
    ...PROJECT_USECASES,
    ...TEMPLATES_USECASES,
    ...GITHUB_USECASES,
  ],
})
export class ApplicationModule {}
