import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainModule } from 'src/domain/domain.module';
import TemplateRepositoryMongo from '../infrastructure/adapters/repository/template/template.repository.mongo';
import TemplateFactory from './factory/template.factory';
import { TEMPLATES_USECASES } from './usecases/templates';
import templateSchema from '../infrastructure/adapters/repository/template/schema/template.schema';

@Module({
  imports: [
    DomainModule,
    MongooseModule.forFeature([
      {
        name: 'Template',
        schema: templateSchema,
      },
    ]),
  ],
  providers: [
    TemplateFactory,
    ...TEMPLATES_USECASES,
    { provide: 'TemplateRepository', useClass: TemplateRepositoryMongo },
  ],
  exports: [TemplateFactory, ...TEMPLATES_USECASES],
})
export class ApplicationModule {}
