import { Injectable } from '@nestjs/common';
import { Configuration } from '../../../../config/env.enum';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export default class GithubClient {
  private readonly githubAppId: string;
  private readonly privateKey: string;
  private readonly githubApiUrl: string;

  constructor(private configService: ConfigService) {
    this.githubAppId = this.configService.get(Configuration.GITHUB_APP_ID);
    this.privateKey = this.configService.get(Configuration.GITHUB_PRIVATE_KEY);
    this.githubApiUrl = this.configService.get(Configuration.GITHUB_API_URL);
  }

  private async getAccessTokenForInstallation(
    installationId: string,
  ): Promise<any> {
    const payload = {
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 10,
      iss: this.githubAppId,
    };
    const token = jwt.sign(payload, this.privateKey, { algorithm: 'RS256' });
    const result = await axios.post(
      `${this.githubApiUrl}/app/installations/${installationId}/access_tokens`,
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

  public async getRepositoriesByInstallationId(
    installationId: string,
  ): Promise<any> {
    const authenticate = await this.getAccessTokenForInstallation(
      installationId,
    );
    const result = await axios.get(
      `${this.githubApiUrl}/installation/${installationId}/repositories`,
      {
        headers: {
          Authorization: `Bearer ${authenticate.token}`,
        },
      },
    );
    if (result.status !== 200) {
      throw new Error('Cannot get repositories');
    }
  }

  public async getInstallationDetails(installationId: string): Promise<any> {
    /*    const payload = {
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 10,
      iss: this.githubAppId,
    };
    const token = jwt.sign(payload, this.privateKey, { algorithm: 'RS256' });
    const result = await axios.get(
      `${this.githubApiUrl}/app/installations/${installationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(result);
    return result.data;*/
    const authenticate = await this.getAccessTokenForInstallation(
      installationId,
    );
    const result = await axios.get(
      `${this.githubApiUrl}/app/installations/${installationId}`,
      {
        headers: {
          Authorization: `Bearer ${authenticate.token}`,
        },
      },
    );
    console.log(result);
    return result.data;
  }
  async createRepositoryInOrganization(
    githubInstallationId: string,
    githubAccountLogin: string,
    repositoryName: string,
    isPrivate: boolean,
  ) {
    const authenticate = await this.getAccessTokenForInstallation(
      githubInstallationId,
    );
    try {
      const result = await axios.post(
        `${this.githubApiUrl}/orgs/${githubAccountLogin}/repos`,
        {
          name: repositoryName,
          org: githubAccountLogin,
          private: isPrivate,
        },
        {
          headers: {
            Authorization: `Bearer ${authenticate.token}`,
            'X-GitHub-Api-Version': '2022-11-28',
          },
        },
      );
      if (result.status !== 201) {
        console.error(result);
        await this.trackGithubClientError();
        throw new Error('Cannot create repository');
      }
      return result.data;
    } catch (error) {
      console.error(error);
      await this.trackGithubClientError();
      throw new Error('Cannot create repository');
    }
  }

  //TODO: Add logic for track error at the moment to use the client
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private async trackGithubClientError() {}
}
