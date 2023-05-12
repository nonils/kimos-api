import { Injectable } from '@nestjs/common';
import { TemplateEntity } from './entity/template.entity';
import { Optional } from 'typescript-optional';
import TemplateMapper from '../../../mapper/template.mapper';
import { TemplateRepository } from '../../../../domain/ports';
import { TemplateM } from '../../../../domain/models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export default class TemplateRepositoryPostgres implements TemplateRepository {
  constructor(
    @InjectRepository(TemplateEntity)
    private templateRepository: Repository<TemplateEntity>,
  ) {}

  public async getAll(): Promise<TemplateM[]> {
    const templates = await this.templateRepository.find();
    return TemplateMapper.toDomains(templates);
  }

  public async createTemplate(
    template: TemplateM,
  ): Promise<Optional<TemplateM>> {
    const templateCreated = await this.templateRepository.save({
      ...template,
      technologies: template.technologies.map((technology) => ({
        id: technology,
      })),
    });
    return TemplateMapper.toDomain(templateCreated);
  }

  public async getTemplate(templateId: string): Promise<Optional<TemplateM>> {
    const template = await this.templateRepository.findOneBy({
      id: templateId,
    });
    return TemplateMapper.toDomain(template);
  }

  public async deleteTemplate(
    templateId: string,
  ): Promise<Optional<TemplateM>> {
    const templateDeleted = await this.getTemplate(templateId);
    await this.templateRepository.delete({
      id: templateId,
    });
    return templateDeleted;
  }

  public async updateTemplate(
    templateId: string,
    template: TemplateM,
  ): Promise<Optional<TemplateM>> {
    await this.templateRepository.update(
      { id: templateId },
      {
        ...template,
        technologies: template.technologies.map((technology) => ({
          id: technology,
        })),
      },
    );
    return this.getTemplate(templateId);
  }
}
