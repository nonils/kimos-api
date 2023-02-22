import { Injectable } from '@nestjs/common';
import { Configuration } from '../../../../config/env.enum';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export default class GithubClient {
  constructor(private configService: ConfigService) {}

  public async getRepositoriesByInstallationId(
    instalationId: string,
  ): Promise<any> {
    const githubAppId = this.configService.get(Configuration.GITHUB_APP_ID);
    const privateKey = this.configService.get(Configuration.GITHUB_PRIVATE_KEY);
    const githubApiUrl = this.configService.get(Configuration.GITHUB_API_URL);

    const payload = {
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 10,
      iss: githubAppId,
    };
    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
    /// Generate access token
    const result = await axios.post(
      `${githubApiUrl}/app/installations/${instalationId}/access_tokens`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (result.status !== 201) {
      throw new Error('Cannot generate access token');
    }
    return result.data;
  }
}
