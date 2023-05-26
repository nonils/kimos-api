/* eslint-disable class-methods-use-this */
import { Injectable } from '@nestjs/common';
import { TemplateM } from '../../domain/models';
import TemplateCommand from '../commands/template.command';

@Injectable()
export default class TemplateFactory {
  public createTemplate(templateCommand: TemplateCommand): TemplateM {
    return new TemplateM(
      '',
      templateCommand.name,
      templateCommand.description,
      templateCommand.templateUrl,
      templateCommand.technologies,
      templateCommand.templateImageUrl,
    );
  }
}
