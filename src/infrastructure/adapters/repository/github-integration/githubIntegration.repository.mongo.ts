import { Injectable } from '@nestjs/common';
import { Optional } from 'typescript-optional';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GithubIntegrationEntity } from './entity/githubIntegration.entity';
import GithubIntegrationMapper from '../../../mapper/githubIntegration.mapper';
import { GithubIntegrationRepositoryInterface } from '../../../../domain/ports';
import { GithubIntegrationM } from '../../../../domain/models';

@Injectable()
export default class GithubIntegrationRepositoryMongo
  implements GithubIntegrationRepositoryInterface
{
  constructor(
    @InjectModel('GithubIntegration')
    private readonly githubIntegrationModel: Model<GithubIntegrationEntity>,
  ) {}

  public async createGithubIntegration(
    githubIntegration: GithubIntegrationM,
  ): Promise<Optional<GithubIntegrationM>> {
    let githubIntegrationCreated = new this.githubIntegrationModel(
      githubIntegration,
    );
    githubIntegrationCreated = await githubIntegrationCreated.save();
    return GithubIntegrationMapper.toDomain(githubIntegrationCreated);
  }

  deleteGithubIntegration(
    githubIntegrationId: string,
  ): Promise<Optional<GithubIntegrationM>> {
    return Promise.resolve(undefined);
  }

  getAll(): Promise<GithubIntegrationM[]> {
    return Promise.resolve([]);
  }

  async getGithubIntegration(
    id: string,
  ): Promise<Optional<GithubIntegrationM>> {
    let optional = Optional.empty<GithubIntegrationM>();
    const integration = await this.githubIntegrationModel.findById(id);
    if (integration) {
      optional = await GithubIntegrationMapper.toDomain(integration);
    }
    return optional;
  }

  updateGithubIntegration(
    githubIntegrationId: string,
    githubIntegration: GithubIntegrationM,
  ): Promise<Optional<GithubIntegrationM>> {
    return Promise.resolve(undefined);
  }
}
