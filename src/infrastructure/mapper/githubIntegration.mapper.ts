import { Optional } from 'typescript-optional';
import { GithubIntegrationM } from '../../domain/models';
import { GithubIntegrationEntity } from '../adapters/repository/github-integration/entity/githubIntegration.entity';

export default class GithubIntegrationMapper {
  public static toDomain(
    githubIntegrationEntity?: GithubIntegrationEntity,
  ): Optional<GithubIntegrationM> {
    if (!githubIntegrationEntity) {
      return Optional.empty<GithubIntegrationM>();
    }
    const template = new GithubIntegrationM(
      githubIntegrationEntity.id,
      githubIntegrationEntity.accountId,
      githubIntegrationEntity.githubInstallationId,
      githubIntegrationEntity.targetType,
      githubIntegrationEntity.targetId,
      githubIntegrationEntity.lastGithubUpdated,
      githubIntegrationEntity.githubAccountLogin,
    );

    template.setCreateAt(new Date(githubIntegrationEntity.createdAt));
    return Optional.of(template);
  }

  public static toDomains(
    githubIntegrationEntities: GithubIntegrationEntity[],
  ): GithubIntegrationM[] {
    const products = new Array<GithubIntegrationM>();
    githubIntegrationEntities.forEach((productEntity) => {
      const product = this.toDomain(productEntity);
      products.push(product.get());
    });
    return products;
  }
}
