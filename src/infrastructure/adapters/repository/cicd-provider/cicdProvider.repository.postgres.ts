import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CICDProviderM } from '../../../../domain/models';
import { CICDProviderEntity } from './entity/CICDProvider.entity';
import { CICDProviderRepositoryInterface } from '../../../../domain/ports/cicdProviderRepository.interface';
import { CICDProviderMapper } from '../../../mapper/cicdProvider.mapper';

export default class CICDProviderRepositoryPostgres
  implements CICDProviderRepositoryInterface
{
  constructor(
    @InjectRepository(CICDProviderEntity)
    private cicdProviderEntityRepository: Repository<CICDProviderEntity>,
  ) {}

  async getAllCICDProviders(): Promise<CICDProviderM[]> {
    return CICDProviderMapper.toDomains(
      await this.cicdProviderEntityRepository.find(),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getCICDProviderById(id: string): Promise<CICDProviderM> {
    return Promise.resolve(undefined);
  }
}
