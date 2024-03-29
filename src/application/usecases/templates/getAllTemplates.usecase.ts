import { Injectable, Inject } from '@nestjs/common';
import { TemplateM } from '../../../domain/models';
import { TemplateRepository } from '../../../domain/ports';
import { Page } from '../../../domain/models/page';

@Injectable()
export default class GetAllTemplatesUseCase {
  constructor(
    @Inject('TemplateRepository')
    private templateRepository: TemplateRepository,
  ) {}

  public async handler(
    page: number,
    size: number,
    search: string,
    codeVersionManagerProvider: string,
    CICDProvider: string,
    cloudProvider: string,
  ): Promise<Page<TemplateM>> {
    const [total, data] = await Promise.all([
      this.templateRepository.countBySearch(
        search,
        codeVersionManagerProvider,
        CICDProvider,
        cloudProvider,
      ),
      this.templateRepository.getAll(
        page,
        size,
        search,
        codeVersionManagerProvider,
        CICDProvider,
        cloudProvider,
      ),
    ]);
    return new Page<TemplateM>(page, size, total, data);
  }
}
