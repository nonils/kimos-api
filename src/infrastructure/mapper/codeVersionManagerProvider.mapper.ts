import { Optional } from 'typescript-optional';
import {
  CloudProviderM,
  CodeVersionManagerProviderM,
} from '../../domain/models';
import { CloudProviderEntity } from '../adapters/repository/cloud-provider/entity/cloudProvider.entity';
import { CodeVersionManagerProviderEntity } from '../adapters/repository/code-version-manager-provider/entity/codeVersionManagerProvider.entity';

export class CodeVersionManagerProviderMapper {
  public static toDomain(
    codeVersionManagerProviderEntity?: CodeVersionManagerProviderEntity,
  ): Optional<CodeVersionManagerProviderM> {
    if (!codeVersionManagerProviderEntity) {
      return Optional.empty<CodeVersionManagerProviderM>();
    }
    const cloudProviderModel = new CodeVersionManagerProviderM(
      codeVersionManagerProviderEntity.id,
      codeVersionManagerProviderEntity.name,
      codeVersionManagerProviderEntity.logo,
      codeVersionManagerProviderEntity.url,
      codeVersionManagerProviderEntity.isDeleted,
      codeVersionManagerProviderEntity.createdAt,
      codeVersionManagerProviderEntity.updatedAt,
      codeVersionManagerProviderEntity.deletedAt,
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
