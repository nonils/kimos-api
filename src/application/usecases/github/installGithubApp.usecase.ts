import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../../../config/env.enum';

@Injectable()
export default class InstallGithubAppUsecase {
  private redis: Redis;
  constructor(
    private configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.getClient();
  }

  public async handler(userId: string): Promise<string> {
    const stateUuid = uuidv4();
    await this.redis.set(
      stateUuid,
      JSON.stringify({ user: userId }),
      'EX',
      60 * 10,
    );
    const githubAppId = this.configService.get(Configuration.GH_APP_NAME);
    const githubAppUrl = this.configService.get(Configuration.GH_APP_URL);
    return `${githubAppUrl}/${githubAppId}/installations/new?state=${stateUuid}`;
  }
}
