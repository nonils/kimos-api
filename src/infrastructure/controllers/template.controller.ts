import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import GetAllTemplatesUseCase from '../../application/usecases/templates/getAllTemplates.usecase';
import CreateTemplateUseCase from '../../application/usecases/templates/createTemplate.usecase';
import TemplateCommand from '../../application/commands/template.command';
import { TemplateM } from '../../domain/models';
import { Page } from '../../domain/models/page';
import { ApiQuery } from '@nestjs/swagger';
import { GetAllTemplateImplementationsUseCase } from '../../application/usecases/templates/getAllTemplateImplementations.usecase';

@Controller('/api/v1/templates')
export default class TemplateController {
  constructor(
    private getAllTemplateUseCase: GetAllTemplatesUseCase,
    private createTemplateUseCase: CreateTemplateUseCase,
    private getTemplateImplementationsUseCase: GetAllTemplateImplementationsUseCase,
  ) {}

  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'size', type: 'number', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @Get()
  public async getTemplates(
    @Res() request,
    @Query('page') page = 0,
    @Query('size') size = 10,
    @Query('search') search = '',
  ): Promise<Page<TemplateM>> {
    const products = await this.getAllTemplateUseCase.handler(
      page,
      size,
      search,
    );
    return request.status(HttpStatus.OK).json(products);
  }

  @Post()
  public async createProduct(
    @Res() request,
    @Body() product: TemplateCommand,
  ): Promise<any> {
    const productCreated = await this.createTemplateUseCase.handler(product);
    return request.status(HttpStatus.CREATED).json(productCreated);
  }

  @Get('/:id/implementations')
  public async getImplementations(
    @Res() request,
    @Param('id') id: string,
  ): Promise<any> {
    await this.getTemplateImplementationsUseCase.handler(id);
    return request.status(HttpStatus.OK).json([]);
  }
}
