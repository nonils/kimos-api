import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ApplicationModule } from '../application/application.module';
import GithubController from './controllers/github.controller';
import TemplateController from './controllers/template.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configuration } from '../config/env.enum';
import { AuthenticationMiddleware } from './middleware/AuthenticationMiddleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from './adapters/repository/template/entity/template.entity';
import { GithubIntegrationEntity } from './adapters/repository/github-integration/entity/githubIntegration.entity';

@Module({
  imports: [
    ApplicationModule,
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
  controllers: [TemplateController, GithubController],
})
export class InfrastructureModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware).forRoutes({
      method: RequestMethod.POST,
      path: 'api/v1/github/create-repo-for-org',
    });
  }
}
