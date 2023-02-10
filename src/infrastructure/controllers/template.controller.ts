import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';
import GetAllTemplatesUseCase from '../../application/usecases/templates/getAllTemplates.usecase';
import CreateTemplateUseCase from '../../application/usecases/templates/createTemplate.usecase';
import TemplateCommand from '../../application/commands/template.command';
// import GetProductUseCase from '../../application/usecases/products/getProduct.usecase';
// import CreateProductUseCase from '../../application/usecases/products/createProduct.usecase';
// import DeleteProductUseCase from '../../application/usecases/products/deleteProduct.usecase';
// import UpdateProductUseCase from '../../application/usecases/products/updateProduct.usecase';
// import Product from '../../domain/models/products.model';

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

  // @Get(':id')
  // public async getProduct(
  //   @Res() request,
  //   @Param('id') id: string,
  // ): Promise<any> {
  //   const product = await this.getProductUseCase.handler(id);
  //   return request.status(HttpStatus.OK).json(product);
  // }
  //
  //
  // @Delete(':id')
  // public async deleteProduct(
  //   @Res() request,
  //   @Param('id') id: string,
  // ): Promise<any> {
  //   const product = await this.deleteProductUseCase.handler(id);
  //   return request.status(HttpStatus.OK).json(product);
  // }
  //
  // @Put(':id')
  // public async updateProduct(
  //   @Res() request,
  //   @Param('id') id: string,
  //   @Body() product: Product,
  // ): Promise<any> {
  //   const productUpdated = await this.updateProductUseCase.handler(id, product);
  //   return request.status(HttpStatus.OK).json(productUpdated);
  // }
}
