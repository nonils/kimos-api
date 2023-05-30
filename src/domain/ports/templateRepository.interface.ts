import { TemplateM } from '../models';
import { Optional } from 'typescript-optional';
export interface TemplateRepository {
  /**
   * Returns the Page of templates filtered by search codeVersionManagerProvider, CICDProvider and cloudProvider
   * @param page
   * @param size
   * @param search
   * @param codeVersionManagerProvider
   * @param CICDProvider
   * @param cloudProvider
   */
  getAll(
    page: number,
    size: number,
    search: string,
    codeVersionManagerProvider: string,
    CICDProvider: string,
    cloudProvider: string,
  ): Promise<TemplateM[]>;

  /**
   * Returns the number of templates filtered by search
   * @param search
   * @param codeVersionManagerProvider
   * @param CICDProvider
   * @param cloudProvider
   */
  countBySearch(
    search: string,
    codeVersionManagerProvider: string,
    CICDProvider: string,
    cloudProvider: string,
  ): Promise<number>;

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
