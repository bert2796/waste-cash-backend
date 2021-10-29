import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateProductInputDto } from '../dtos';
import { CategoryService } from '../../category/services/category.service';
import { User } from '../../user/entities/user.entity';
import { Product } from '../entities/product.entity';
import { ProductRepository } from '../repositories/product.repository';
import { randomString, slugify } from '../../../common/utils';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService
  ) {}

  async createProduct(input: CreateProductInputDto, owner: User): Promise<Product> {
    const { category: categoryName, description, name, price, status } = input;

    const category = await this.categoryService.getCategoryByName(categoryName);
    const product = new Product();
    product.category = category;
    product.owner = owner;
    product.description = description;
    product.name = name;
    product.price = price;
    product.slug = `${slugify(name)}-${randomString()}`;
    product.status = status;
    product.thumbnail = 'a';

    return await this.productRepository.save(product);
  }

  async getProducts(filter?: Partial<Product>): Promise<Product[]> {
    return await this.productRepository.findProducts({ filter });
  }

  async getProductsByOwner(owner: User, filter?: Partial<Product>): Promise<Product[]> {
    return await this.productRepository.findProducts({ filter, owner });
  }

  async getProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id, { relations: ['category', 'owner', 'bidder'] });
    if (!product) {
      throw new BadRequestException('Product does not exist.');
    }

    return product;
  }
}
