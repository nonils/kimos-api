import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TemplateEntity } from './entity/template.entity';
import { Optional } from 'typescript-optional';
import TemplateMapper from '../../../mapper/template.mapper';
import { TemplateRepository } from '../../../../domain/ports';
import { TemplateM } from '../../../../domain/models';

@Injectable()
export default class TemplateRepositoryMongo implements TemplateRepository {
  constructor(
    @InjectModel('Template')
    private readonly templateModel: Model<TemplateEntity>,
  ) {}

  public async getAll(): Promise<TemplateM[]> {
    const products = await this.templateModel.find();
    return TemplateMapper.toDomains(products);
  }

  public async createTemplate(
    template: TemplateM,
  ): Promise<Optional<TemplateM>> {
    let templateCreated = new this.templateModel(template);
    templateCreated = await templateCreated.save();
    return TemplateMapper.toDomain(templateCreated);
  }

  public async getTemplate(templateId: string): Promise<Optional<TemplateM>> {
    const template = await this.templateModel.findById(templateId);
    return TemplateMapper.toDomain(template);
  }

  public async deleteTemplate(
    templateId: string,
  ): Promise<Optional<TemplateM>> {
    const templateDeleted = await this.templateModel.findByIdAndDelete(
      templateId,
    );
    return TemplateMapper.toDomain(templateDeleted);
  }

  public async updateProduct(
    templateId: string,
    template: TemplateM,
  ): Promise<Optional<TemplateM>> {
    const templateUpdated = await this.templateModel.findByIdAndUpdate(
      templateId,
      template,
      { new: true },
    );
    return TemplateMapper.toDomain(templateUpdated);
  }
}
