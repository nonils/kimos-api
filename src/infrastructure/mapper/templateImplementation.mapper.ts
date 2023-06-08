import { Optional } from 'typescript-optional';
import { TemplateImplementationM } from '../../domain/models';
import { TemplateImplementationEntity } from '../adapters/repository/template/entity/templateImplementation.entity';

export class TemplateImplementationMapper {
  public static toDomain(
    templateImplementationEntity?: TemplateImplementationEntity,
  ): Optional<TemplateImplementationM> {
    if (!templateImplementationEntity) {
      return Optional.empty<TemplateImplementationM>();
    }
    const templateImplementation = new TemplateImplementationM();
    templateImplementation.id = templateImplementationEntity.id;
    templateImplementation.templateId = templateImplementationEntity.templateId;
    templateImplementation.cloudProviderId =
      templateImplementationEntity.cloudProviderId;
    templateImplementation.cicdProviderId =
      templateImplementationEntity.cicdProviderId;
    templateImplementation.codeVersionManagerProviderId =
      templateImplementationEntity.codeVersionManagerProviderId;
    templateImplementation.isDeleted = templateImplementationEntity.isDeleted;
    templateImplementation.createdAt = templateImplementationEntity.createdAt;
    templateImplementation.updatedAt = templateImplementationEntity.updatedAt;
    templateImplementation.deletedAt = templateImplementationEntity.deletedAt;
    return Optional.of(templateImplementation);
  }

  public static toDomains(
    templateImplementationsEntities: TemplateImplementationEntity[],
  ): TemplateImplementationM[] {
    const templateImplementations = new Array<TemplateImplementationM>();
    templateImplementationsEntities.forEach((templateImplementationEntity) => {
      const templateImplementation = this.toDomain(
        templateImplementationEntity,
      );
      templateImplementations.push(templateImplementation.get());
    });
    return templateImplementations;
  }
}
