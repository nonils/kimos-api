import { Injectable, Inject } from '@nestjs/common';
import { TemplateM } from '../../../domain/models';
import { TemplateRepository } from '../../../domain/ports';
import TemplateFactory from '../../factory/template.factory';
import TemplateCommand from '../../commands/template.command';
import { Optional } from 'typescript-optional';

@Injectable()
export default class GetAllTemplatesUseCase {
  constructor(
    @Inject('TemplateRepository')
    private templateRepository: TemplateRepository,
    private templateFactory: TemplateFactory,
  ) {}

  public handler(
    productCommand: TemplateCommand,
  ): Promise<Optional<TemplateM>> {
    const template = this.templateFactory.createTemplate(productCommand);
    return this.templateRepository.createTemplate(template);
  }
}
