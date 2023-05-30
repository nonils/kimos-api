import { Inject, Injectable } from '@nestjs/common';
import { TemplateImplementationRepository } from '../../../domain/ports';
import { TemplateImplementationM } from '../../../domain/models';

@Injectable()
export class GetAllTemplateImplementationsUseCase {
  constructor(
    @Inject('TemplateImplementationRepository')
    private templateImplementationRepository: TemplateImplementationRepository,
  ) {}

  public async handler(id: string): Promise<TemplateImplementationM[]> {
    return this.templateImplementationRepository.getAllTemplateImplementationsByTemplateId(
      id,
    );
  }
}
