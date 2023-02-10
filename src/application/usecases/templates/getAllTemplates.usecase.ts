import { Injectable, Inject } from '@nestjs/common';
import { TemplateM } from '../../../domain/models';
import { TemplateRepository } from '../../../domain/ports';

@Injectable()
export default class GetAllTemplatesUseCase {
  constructor(
    @Inject('TemplateRepository')
    private templateRepository: TemplateRepository,
  ) {}

  public handler(): Promise<TemplateM[]> {
    return this.templateRepository.getAll();
  }
}
