import { Injectable } from '@nestjs/common';
import { CodeVersionManagerProviderM } from '../../../../domain/models';
import { CodeVersionManagerProviderRepositoryInterface } from '../../../../domain/ports/codeVersionManagerProviderRepository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CodeVersionManagerProviderEntity } from './entity/codeVersionManagerProvider.entity';
import { CodeVersionManagerProviderMapper } from '../../../mapper/codeVersionManagerProvider.mapper';

@Injectable()
export class CodeVersionManagerProviderRepositoryPostgres
  implements CodeVersionManagerProviderRepositoryInterface
{
  constructor(
    @InjectRepository(CodeVersionManagerProviderEntity)
    private codeVersionManagerProviderEntityRepository: Repository<CodeVersionManagerProviderEntity>,
  ) {}

  public async getAllCodeVersionManagerProviders(): Promise<
    CodeVersionManagerProviderM[]
  > {
    const result = await this.codeVersionManagerProviderEntityRepository.find();
    return CodeVersionManagerProviderMapper.toDomains(result);
  }
}
