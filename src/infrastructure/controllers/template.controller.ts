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
import { validate } from 'uuid';
import GetAllTemplatesUseCase from '../../application/usecases/templates/getAllTemplates.usecase';
import CreateTemplateUseCase from '../../application/usecases/templates/createTemplate.usecase';
import TemplateCommand from '../../application/commands/template.command';
import { TemplateM } from '../../domain/models';
import { Page } from '../../domain/models/page';
import { ApiQuery } from '@nestjs/swagger';
import { GetAllTemplateImplementationsUseCase } from '../../application/usecases/templates/getAllTemplateImplementations.usecase';
import { InvalidQueryParamException } from '../../domain/exceptions/InvalidQueryParamException';

@Controller('/api/v1/templates')
export default class TemplateController {
  constructor(
    private getAllTemplateUseCase: GetAllTemplatesUseCase,
    private createTemplateUseCase: CreateTemplateUseCase,
    private getTemplateImplementationsUseCase: GetAllTemplateImplementationsUseCase,
  ) {}

  private validateGetTemplateParams(
    page: number,
    size: number,
    search: string,
    codeVersionManagerProvider: string,
    CICDProvider: string,
    cloudProvider: string,
  ) {
    if (codeVersionManagerProvider && !validate(codeVersionManagerProvider)) {
      throw new InvalidQueryParamException(
        'codeVersionManagerProvider must be an uuid ',
      );
    }
    if (CICDProvider && !validate(CICDProvider)) {
      throw new InvalidQueryParamException(
        'codeVersionManagerProvider must be an uuid ',
      );
    }
    if (cloudProvider && !validate(cloudProvider)) {
      throw new InvalidQueryParamException(
        'codeVersionManagerProvider must be an uuid ',
      );
    }
  }

  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'size', type: 'number', required: false })
  @ApiQuery({ name: 'search', type: 'string', required: false })
  @Get()
  public async getTemplates(
    @Res() request,
    @Query('page') page = 0,
    @Query('size') size = 10,
    @Query('search') search = '',
    @Query('codeVersionManagerProvider') codeVersionManagerProvider: string,
    @Query('CICDProvider') CICDProvider: string,
    @Query('cloudProvider') cloudProvider: string,
  ): Promise<Page<TemplateM>> {
    this.validateGetTemplateParams(
      page,
      size,
      search,
      codeVersionManagerProvider,
      CICDProvider,
      cloudProvider,
    );
    const products = await this.getAllTemplateUseCase.handler(
      page,
      size,
      search,
      codeVersionManagerProvider,
      CICDProvider,
      cloudProvider,
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
