import { EntityRepository, Repository } from 'typeorm';

import { ProductOffer } from '../entities/productOffer.entity';

@EntityRepository(ProductOffer)
export class ProductOfferRepository extends Repository<ProductOffer> {
  async getMonthlySales(
    productIds: number[]
  ): Promise<{ year: number; month: number; price: number; productId: number; status: string }[]> {
    return this.createQueryBuilder('productOffers')
      .select([
        'YEAR(productOffers.createdAt) as year',
        'MONTH(productOffers.createdAt) as month',
        'SUM(productOffers.price) as price',
        'productOffers.productId as productId',
        'productOffers.status as status',
      ])
      .where('productId in (:productIds)', { productIds })
      .andWhere('status = :status', { status: 'accepted' })
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
