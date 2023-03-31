import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import GetAllTemplatesUseCase from '../../application/usecases/templates/getAllTemplates.usecase';
import CreateTemplateUseCase from '../../application/usecases/templates/createTemplate.usecase';
import TemplateCommand from '../../application/commands/template.command';

@Controller('/api/v1/templates')
export default class TemplateController {
  constructor(
    private getAllTemplateUseCase: GetAllTemplatesUseCase,
    private createTemplateUseCase: CreateTemplateUseCase,
  ) {}

  @Get()
  public async getProducts(@Res() request): Promise<any> {
    const products = await this.getAllTemplateUseCase.handler();
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
}
