import { Controller, Get, Post, HttpCode, HttpStatus, Param, Body, Req, Query } from '@nestjs/common';

import { Authorize } from '../../../common/decorators/authorize.decorator';
import { UserRoles } from '../../../common/constant';
import { CreateProductInputDto } from '../dtos';
import { User } from '../../user/entities/user.entity';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @Authorize([UserRoles.SELLER])
  async createProduct(@Body() input: CreateProductInputDto, @Req() req: { user: User }): Promise<Product> {
    const { user } = req;

    return await this.productService.createProduct(input, user);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getProducts(@Query() query: Partial<Product>): Promise<Product[]> {
    return await this.productService.getProducts(query);
  }

  @Get('/owners')
  @HttpCode(HttpStatus.OK)
  @Authorize([UserRoles.SELLER])
  async getProductsByOwner(@Query() query: Partial<Product>, @Req() req: { user: User }): Promise<Product[]> {
    const { user } = req;

    return await this.productService.getProductsByOwner(user, query);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getProduct(@Param('id') id: string): Promise<Product> {
    return await this.productService.getProduct(+id);
  }
}
