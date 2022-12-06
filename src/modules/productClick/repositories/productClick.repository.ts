import { EntityRepository, Repository } from 'typeorm';

import { ProductClick } from '../entities/productClick.entity';

@EntityRepository(ProductClick)
export class ProductClickRepository extends Repository<ProductClick> {
  async getMonthlyClicks(
    productIds: number[]
  ): Promise<{ year: number; month: number; price: number; productId: number; status: string }[]> {
    return this.createQueryBuilder('productClicks')
      .select([
        'YEAR(productClicks.createdAt) as year',
        'MONTH(productClicks.createdAt) as month',
        'SUM(productClicks.counter) as counter',
        'productClicks.productId as productId',
      ])
      .where('productId in (:productIds)', { productIds })
      .groupBy('year')
      .addGroupBy('month')
      .addGroupBy('productId')
      .orderBy({
        year: 'ASC',
        month: 'ASC',
      })
      .getRawMany();
  }
}
