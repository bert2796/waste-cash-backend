import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateCategoryInputDto } from '../dtos';
import { Category } from '../entities/category.entity';
import { CategoryRepository } from '../repositories/category.repository';
import { slugify } from '../../../common/utils';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(input: CreateCategoryInputDto): Promise<Category> {
    const { name } = input;
    let category = await this.categoryRepository.findOne({ name });
    if (category) {
      throw new BadRequestException('Category is already existing.');
    }

    category = new Category();
    category.name = name;
    category.slug = slugify(name);

    return await this.categoryRepository.save(category);
  }

  async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async getCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (!category) {
      throw new BadRequestException('Category does not exist.');
    }

    return category;
  }

  async getCategoryByName(name: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { name } });
    if (!category) {
      throw new BadRequestException('Category does not exist.');
    }

    return category;
  }
}
