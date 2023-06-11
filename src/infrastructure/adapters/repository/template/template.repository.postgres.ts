import { Injectable } from '@nestjs/common';
import { TemplateEntity } from './entity/template.entity';
import { Optional } from 'typescript-optional';
import TemplateMapper from '../../../mapper/template.mapper';
import { TemplateRepository } from '../../../../domain/ports';
import { CICDProviderM, TemplateM } from '../../../../domain/models';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';

@Injectable()
export default class TemplateRepositoryPostgres implements TemplateRepository {
  constructor(
    @InjectRepository(TemplateEntity)
    private templateRepository: Repository<TemplateEntity>,
  ) {}

  public async getAll(
    page: number,
    size: number,
    search: string,
    codeVersionManagerProvider: string,
    CICDProvider: string,
    cloudProvider: string,
  ): Promise<TemplateM[]> {
    let where = `template.name ilike :search`;
    if (codeVersionManagerProvider) {
      where = `${where} AND templateImplementation.codeVersionManagerProvider = :codeVersionManagerProvider`;
    }
    if (CICDProvider) {
      where = `${where} AND templateImplementation.cicdProvider = :cicdProvider`;
    }
    if (cloudProvider) {
      where = `${where} AND templateImplementation.cloudProvider = :cloudProvider`;
    }
    const templates = await this.templateRepository
      .createQueryBuilder('template')
      .innerJoinAndSelect(
        'template.templateImplementations',
        'templateImplementation',
      )
      .where(where, {
        search: `%${search}%`,
        codeVersionManagerProvider,
        cloudProvider,
        cicdProvider: CICDProvider,
      })
      .take(size)
      .offset(page * size)
      .getMany();
    return TemplateMapper.toDomains(templates);
  }

  public async countBySearch(
    search: string,
    codeVersionManagerProvider: string,
    CICDProvider: string,
    cloudProvider: string,
  ): Promise<number> {
    let where = `template.name ilike :search`;
    if (codeVersionManagerProvider) {
      where = `${where} AND templateImplementation.codeVersionManagerProvider = :codeVersionManagerProvider`;
    }
    if (CICDProvider) {
      where = `${where} AND templateImplementation.cicdProvider = :cicdProvider`;
    }
    if (cloudProvider) {
      where = `${where} AND templateImplementation.cloudProvider = :cloudProvider`;
    }
    return this.templateRepository
      .createQueryBuilder('template')
      .innerJoinAndSelect(
        'template.templateImplementations',
        'templateImplementation',
      )
      .where(where, {
        search: `%${search}%`,
        codeVersionManagerProvider,
        cloudProvider,
        cicdProvider: CICDProvider,
      })
      .getCount();
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
