import { TemplateM } from '../models';
import { Optional } from 'typescript-optional';
export interface TemplateRepository {
  /**
   *
   */
  getAll(page: number, size: number, search: string): Promise<TemplateM[]>;

  /**
   * Returns the number of templates filtered by search
   * @param search
   */
  countBySearch(search: string): Promise<number>;

  /**
   * Returns template filtered by id
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
  updateTemplate(
    templateId: string,
    template: TemplateM,
  ): Promise<Optional<TemplateM>>;
}
