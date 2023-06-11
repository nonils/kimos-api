import { Inject, Injectable } from '@nestjs/common';
import { TemplateImplementationRepositoryInterface } from '../../../domain/ports';
import { TemplateImplementationM } from '../../../domain/models';

@Injectable()
export class GetAllTemplateImplementationsUseCase {
  constructor(
    @Inject('TemplateImplementationRepository')
    private templateImplementationRepository: TemplateImplementationRepositoryInterface,
  ) {}

  public async handler(id: string): Promise<TemplateImplementationM[]> {
    return this.templateImplementationRepository.getAllTemplateImplementationsByTemplateId(
      id,
    );
  }
}
