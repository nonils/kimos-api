import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationModule } from '../application/application.module';
import TemplateSchema from './adapters/repository/template/schema/template.schema';
import GithubController from './controllers/github.controller';
import TemplateController from './controllers/template.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Configuration } from '../config/env.enum';
import GithubIntegrationSchema from './adapters/repository/github-integration/schema/githubIntegration.schema';
import { AuthenticationMiddleware } from './middleware/AuthenticationMiddleware';

@Module({
  imports: [
    ApplicationModule,
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `${configService.get(Configuration.MONGO_CONNECTION_STRING)}`,
      }),
    }),
    MongooseModule.forFeature([
      { name: 'Template', schema: TemplateSchema },
      {
        name: 'GithubIntegration',
        schema: GithubIntegrationSchema,
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
