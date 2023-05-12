import { Optional } from 'typescript-optional';
import { AccountEntity } from '../adapters/repository/account/entity/account.entity';
import { OrganizationEntity } from '../adapters/repository/organization/entity/organization.entity';
import { OrganizationM } from '../../domain/models';

export default class OrganizationMapper {
  public static toEntity(organization: OrganizationM): OrganizationEntity {
    const organizationEntity = new OrganizationEntity();
    organizationEntity.id = organization.id;
    organizationEntity.name = organization.name;
    organizationEntity.email = organization.email;
    organizationEntity.imageUrl = organization.imageUrl;
    organizationEntity.description = organization.description;
    organizationEntity.billingEmail = organization.billingEmail;
    organizationEntity.url = organization.url;
    organizationEntity.plan = organization.plan;
    organizationEntity.owner = new AccountEntity();
    return organizationEntity;
  }
  public static toDomain(
    organizationEntity?: OrganizationEntity,
  ): Optional<OrganizationM> {
    if (!organizationEntity) {
      return Optional.empty<OrganizationM>();
    }
    const organization = new OrganizationM();
    organization.id = organizationEntity.id;
    organization.name = organizationEntity.name;
    organization.email = organizationEntity.email;
    organization.imageUrl = organizationEntity.imageUrl;
    organization.description = organizationEntity.description;
    organization.billingEmail = organizationEntity.billingEmail;
    organization.url = organizationEntity.url;
    organization.plan = organizationEntity.plan;
    organization.ownerId = organizationEntity.owner?.id;
    organization.setCreateAt(new Date(organizationEntity.createdAt));
    organization.setUpdatedAt(new Date(organizationEntity.updatedAt));
    return Optional.of(organization);
  }
  public static toDomains(
    organizationEntities: OrganizationEntity[],
  ): OrganizationM[] {
    const projects = new Array<OrganizationM>();
    organizationEntities.forEach((projectEntity) => {
      const product = this.toDomain(projectEntity);
      projects.push(product.get());
    });
    return projects;
  }
}
