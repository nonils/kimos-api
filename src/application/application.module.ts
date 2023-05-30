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
import CloudProviderRepositoryPostgres from '../infrastructure/adapters/repository/cloud-provider/cloudProvider.repository.postgres';
import CICDProviderRepositoryPostgres from '../infrastructure/adapters/repository/cicd-provider/cicdProvider.repository.postgres';
import { CLOUD_PROVIDER_USECASES } from './usecases/cloud-provider';
import { CODE_VERSION_MANAGER_PROVIDER_USECASES } from './usecases/code-version-manager-provider';
import { CodeVersionManagerProviderRepositoryPostgres } from '../infrastructure/adapters/repository/code-version-manager-provider/codeVersionManagerProvider.repository.postgres';
import { CICD_PROVIDER_USECASES } from './usecases/cicd-provider';
import { CloudProviderEntity } from '../infrastructure/adapters/repository/cloud-provider/entity/cloudProvider.entity';
import { CICDProviderEntity } from '../infrastructure/adapters/repository/cicd-provider/entity/CICDProvider.entity';
import { CodeVersionManagerProviderEntity } from '../infrastructure/adapters/repository/code-version-manager-provider/entity/codeVersionManagerProvider.entity';

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
      CloudProviderEntity,
      CodeVersionManagerProviderEntity,
      CICDProviderEntity,
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
    ...CLOUD_PROVIDER_USECASES,
    ...CICD_PROVIDER_USECASES,
    ...CODE_VERSION_MANAGER_PROVIDER_USECASES,
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
      provide: 'CloudProviderRepository',
      useClass: CloudProviderRepositoryPostgres,
    },
    {
      provide: 'CICDProviderRepository',
      useClass: CICDProviderRepositoryPostgres,
    },
    {
      provide: 'CodeVersionManagerProviderRepository',
      useClass: CodeVersionManagerProviderRepositoryPostgres,
    },
    {
      provide: 'TemplateImplementationRepository',
      useClass: TemplateRepositoryPostgres,
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
    ...CLOUD_PROVIDER_USECASES,
    ...CICD_PROVIDER_USECASES,
    ...CODE_VERSION_MANAGER_PROVIDER_USECASES,
    ...ORGANIZATION_USECASES,
    ...PROJECT_USECASES,
    ...TEMPLATES_USECASES,
    ...GITHUB_USECASES,
  ],
})
export class ApplicationModule {}
