import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainModule } from 'src/domain/domain.module';
import TemplateRepositoryMongo from '../infrastructure/adapters/repository/template/template.repository.mongo';
import TemplateFactory from './factory/template.factory';
import GithubIntegrationFactory from './factory/githubIntegration.factory';
import { TEMPLATES_USECASES } from './usecases/templates';
import templateSchema from '../infrastructure/adapters/repository/template/schema/template.schema';
import { GITHUB_USECASES } from './usecases/github';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Configuration } from '../config/env.enum';
import GithubIntegrationRepositoryMongo from '../infrastructure/adapters/repository/github-integration/githubIntegration.repository.mongo';
import githubIntegrationSchema from '../infrastructure/adapters/repository/github-integration/schema/githubIntegration.schema';
import GithubClient from '../infrastructure/adapters/client/github/github.client';

@Module({
  imports: [
    DomainModule,
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: 'Template',
        schema: templateSchema,
      },
      {
        name: 'GithubIntegration',
        schema: githubIntegrationSchema,
      },
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
    GithubIntegrationFactory,
    ...GITHUB_USECASES,
    ...TEMPLATES_USECASES,
    { provide: 'TemplateRepository', useClass: TemplateRepositoryMongo },
    {
      provide: 'GithubIntegrationRepository',
      useClass: GithubIntegrationRepositoryMongo,
    },
    {
      provide: 'GithubClient',
      useClass: GithubClient,
    },
  ],
  exports: [TemplateFactory, ...TEMPLATES_USECASES, ...GITHUB_USECASES],
})
export class ApplicationModule {}
