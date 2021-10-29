import { Controller, Get, Post, HttpCode, HttpStatus, Body, Param } from '@nestjs/common';

import { CreateCategoryInputDto } from '../dtos';
import { Category } from '../entities/category.entity';
import { CategoryService } from '../services/category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Body() input: CreateCategoryInputDto): Promise<Category> {
    return await this.categoryService.createCategory(input);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getCategories(): Promise<Category[]> {
    return await this.categoryService.getCategories();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getCategory(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.getCategory(+id);
  }
}
