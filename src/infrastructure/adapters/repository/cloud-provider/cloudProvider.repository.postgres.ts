import { CloudProviderRepositoryInterface } from '../../../../domain/ports';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CloudProviderEntity } from './entity/cloudProvider.entity';
import { CloudProviderM } from '../../../../domain/models';
import { CloudProviderMapper } from '../../../mapper/cloudProvider.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class CloudProviderRepositoryPostgres
  implements CloudProviderRepositoryInterface
{
  constructor(
    @InjectRepository(CloudProviderEntity)
    private cloudProviderEntityRepository: Repository<CloudProviderEntity>,
  ) {}

  async getAllCloudProviders(): Promise<CloudProviderM[]> {
    return CloudProviderMapper.toDomains(
      await this.cloudProviderEntityRepository.find(),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCloudProviderById(id: string): Promise<CloudProviderM> {
    return Promise.resolve(undefined);
  }
}
