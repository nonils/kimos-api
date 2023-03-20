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
import { ACCOUNT_USECASE } from './usecases/account';
import AccountRepositoryPostgres from '../infrastructure/adapters/repository/account/account.repository.postgres';
@Module({
  imports: [
    DomainModule,
    ConfigModule,
    TemplateEntity,
    GithubIntegrationEntity,
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
    TypeOrmModule.forFeature([TemplateEntity, GithubIntegrationEntity]),
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
    GithubIntegrationFactory,
    ...ACCOUNT_USECASE,
    ...GITHUB_USECASES,
    ...TEMPLATES_USECASES,
    { provide: 'AccountRepository', useClass: AccountRepositoryPostgres },
    { provide: 'TemplateRepository', useClass: TemplateRepositoryPostgres },
    {
      provide: 'GithubIntegrationRepository',
      useClass: GithubIntegrationRepositoryPostgres,
    },
    {
      provide: 'GithubClient',
      useClass: GithubClient,
    },
  ],
  exports: [TemplateFactory, ...TEMPLATES_USECASES, ...GITHUB_USECASES],
})
export class ApplicationModule {}
