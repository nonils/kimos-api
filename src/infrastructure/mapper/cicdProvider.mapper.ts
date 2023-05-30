import { Optional } from 'typescript-optional';
import { CICDProviderM, CloudProviderM } from '../../domain/models';
import { CICDProviderEntity } from '../adapters/repository/cicd-provider/entity/CICDProvider.entity';

export class CICDProviderMapper {
  public static toDomain(
    cicdProviderEntity?: CICDProviderEntity,
  ): Optional<CICDProviderM> {
    if (!cicdProviderEntity) {
      return Optional.empty<CICDProviderM>();
    }
    const cicdProvider = new CICDProviderM(
      cicdProviderEntity.id,
      cicdProviderEntity.name,
      cicdProviderEntity.logo,
      cicdProviderEntity.url,
      cicdProviderEntity.isDeleted,
      cicdProviderEntity.createdAt,
      cicdProviderEntity.updatedAt,
      cicdProviderEntity.deletedAt,
    );
    return Optional.of(cicdProvider);
  }

  public static toDomains(
    cicdProviderEntities: CICDProviderEntity[],
  ): CICDProviderM[] {
    const cloudProviders = new Array<CloudProviderM>();
    cicdProviderEntities.forEach((cicdProviderEntity) => {
      const cicdProvider = this.toDomain(cicdProviderEntity);
      cloudProviders.push(cicdProvider.get());
    });
    return cloudProviders;
  }
}
