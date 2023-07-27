import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ApplicationModule } from '../application/application.module';
import GithubController from './controllers/github.controller';
import TemplateController from './controllers/template.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configuration } from '../config/env.enum';
import { AuthenticationMiddleware } from './middleware/AuthenticationMiddleware';
import AccountController from './controllers/account.controller';
import OrganizationController from './controllers/organization.controller';
import ProjectController from './controllers/project.controller';
import CICDProviderController from './controllers/CICDProvider.controller';
import CodeVersionProviderController from './controllers/codeVersionProvider.controller';
import CloudProviderController from './controllers/cloudProvider.controller';
import HomeController from './controllers/home.controller';
import ApplicationController from './controllers/application.controller';

@Module({
  imports: [
    ApplicationModule,
    PassportModule,
    ConfigModule,
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
  controllers: [
    AccountController,
    ApplicationController,
    CICDProviderController,
    CloudProviderController,
    CodeVersionProviderController,
    TemplateController,
    GithubController,
    OrganizationController,
    ProjectController,
    HomeController,
  ],
})
export class InfrastructureModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      {
        method: RequestMethod.POST,
        path: 'api/v1/github/create-repo-for-org',
      },
      {
        method: RequestMethod.GET,
        path: 'api/v1/projects',
      },
      {
        method: RequestMethod.GET,
        path: 'api/v1/projects/:projectId',
      },
      {
        method: RequestMethod.POST,
        path: 'api/v1/projects',
      },
      {
        method: RequestMethod.GET,
        path: 'api/v1/accounts/me',
      },
    );
  }
}
