import { BadRequestException, Injectable } from '@nestjs/common';

import { Product } from '../../product/entities/product.entity';
import { ProductClick } from '../entities/productClick.entity';
import { ProductClickRepository } from '../repositories/productClick.repository';

@Injectable()
export class ProductClickService {
  constructor(private readonly productClickRepository: ProductClickRepository) {}

  async createProductClick(params: { product: Product }): Promise<ProductClick> {
    const { product } = params;

    let productClick = await this.productClickRepository.findOne(product.id);
    if (productClick) {
      productClick.counter = productClick.counter + 1;
    } else {
      productClick = new ProductClick();
      productClick.product = product;
      productClick.counter = 1;
    }

    return await this.productClickRepository.save(productClick, { reload: true });
  }

  async updateProductClick(productClickId: number, input: Partial<ProductClick>): Promise<void> {
    await this.productClickRepository.update({ id: productClickId }, input);
  }

  async getProductClickByProduct(productId: number): Promise<ProductClick> {
    const productClick = await this.productClickRepository.findOne(productId);
    if (!productClick) {
      throw new BadRequestException('Product click does not exist.');
    }

    return productClick;
  }

  async getMonthlyClicks(
    productIds: number[]
  ): Promise<{ year: number; month: number; price: number; productId: number; status: string }[]> {
    return await this.productClickRepository.getMonthlyClicks(productIds);
  }
}
