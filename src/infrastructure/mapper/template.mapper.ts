import { Optional } from 'typescript-optional';
import { TemplateM } from '../../domain/models';
import { TemplateEntity } from '../adapters/repository/template/entity/template.entity';

export default class TemplateMapper {
  public static toDomain(templateEntity?: TemplateEntity): Optional<TemplateM> {
    if (!templateEntity) {
      return Optional.empty<TemplateM>();
    }
    const template = new TemplateM(
      templateEntity.id,
      templateEntity.name,
      templateEntity.description,
      [],
    );

    template.setCreateAt(new Date(templateEntity.createdAt));
    return Optional.of(template);
  }

  public static toDomains(productsEntity: TemplateEntity[]): TemplateM[] {
    const products = new Array<TemplateM>();
    productsEntity.forEach((productEntity) => {
      const product = this.toDomain(productEntity);
      products.push(product.get());
    });
    return products;
  }
}
