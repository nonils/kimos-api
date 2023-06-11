import { Optional } from 'typescript-optional';
import { CloudProviderM } from '../../domain/models';
import { CloudProviderEntity } from '../adapters/repository/cloud-provider/entity/cloudProvider.entity';

export class CloudProviderMapper {
  public static toDomain(
    cloudProviderEntity?: CloudProviderEntity,
  ): Optional<CloudProviderM> {
    if (!cloudProviderEntity) {
      return Optional.empty<CloudProviderM>();
    }
    const cloudProviderModel = new CloudProviderM(
      cloudProviderEntity.id,
      cloudProviderEntity.name,
      cloudProviderEntity.logo,
      cloudProviderEntity.url,
      cloudProviderEntity.isDeleted,
      cloudProviderEntity.createdAt,
      cloudProviderEntity.updatedAt,
      cloudProviderEntity.deletedAt,
    );
    return Optional.of(cloudProviderModel);
  }

  public static toDomains(
    cloudProviderEntities: CloudProviderEntity[],
  ): CloudProviderM[] {
    const cloudProviders = new Array<CloudProviderM>();
    cloudProviderEntities.forEach((templateImplementationEntity) => {
      const templateImplementation = this.toDomain(
        templateImplementationEntity,
      );
      cloudProviders.push(templateImplementation.get());
    });
    return cloudProviders;
  }
}
