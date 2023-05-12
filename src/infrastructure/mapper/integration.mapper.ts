import { Optional } from 'typescript-optional';
import { IntegrationEntity } from '../adapters/repository/integration/entity/integration.entity';
import { IntegrationM } from '../../domain/models/integration.model';

export default class IntegrationMapper {
  public static toEntity(integration: IntegrationM): IntegrationEntity {
    const integrationEntity = new IntegrationEntity();
    integrationEntity.id = integration.id;
    integrationEntity.name = integration.name;
    integrationEntity.description = integration.description;
    integrationEntity.type = integration.type;
    return integrationEntity;
  }
  public static toDomain(
    integrationEntity?: IntegrationEntity,
  ): Optional<IntegrationM> {
    if (!integrationEntity) {
      return Optional.empty<IntegrationM>();
    }
    const integration = new IntegrationM(
      integrationEntity.id,
      integrationEntity.name,
      integrationEntity.description,
      integrationEntity.type,
    );
    integration.setCreateAt(new Date(integrationEntity.createdAt));
    return Optional.of(integration);
  }

  public static toDomains(
    integrationEntities: IntegrationEntity[],
  ): IntegrationM[] {
    const integrations = new Array<IntegrationM>();
    integrationEntities.forEach((integrationEntity) => {
      const product = this.toDomain(integrationEntity);
      integrations.push(product.get());
    });
    return integrations;
  }
}
