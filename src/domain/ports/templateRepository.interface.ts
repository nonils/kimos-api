import { TemplateM } from '../models';
import { Optional } from 'typescript-optional';
export interface TemplateRepository {
  /**
   *
   */
  getAll(): Promise<TemplateM[]>;

  /**
   * Returns product filtered by id
   * @returns a `Template` object containing the data.
   * @param id
   */
  getTemplate(id: string): Promise<Optional<TemplateM>>;

  /**
   *
   */
  createTemplate(template: TemplateM): Promise<Optional<TemplateM>>;

  /**
   *
   */
  deleteTemplate(templateId: string): Promise<Optional<TemplateM>>;

  /**
   *
   */
  updateProduct(
    templateId: string,
    template: TemplateM,
  ): Promise<Optional<TemplateM>>;
}
