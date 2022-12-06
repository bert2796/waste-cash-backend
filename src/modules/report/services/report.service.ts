import { Injectable } from '@nestjs/common';

import { ProductService } from '../../product/services/product.service';
import { ProductClickService } from '../../productClick/services/productClick.service';
import { ProductOfferService } from '../../productOffer/services/productOffer.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly productService: ProductService,
    private readonly productClickService: ProductClickService,
    private readonly productOfferService: ProductOfferService
  ) {}

  async getMonthlySales(
    userId: number
  ): Promise<{ year: number; month: number; price: number; productId: number; status: string }[]> {
    // get products by userId
    const products = await this.productService.getProductsByUser(userId);

    // get monthly sales
    const monthlySales = await this.productOfferService.getMonthlySales(products.map((product) => product.id));

    return monthlySales;
  }

  async getMonthlyClcks(
    userId: number
  ): Promise<{ year: number; month: number; price: number; productId: number; status: string }[]> {
    // get products by userId
    const products = await this.productService.getProductsByUser(userId);

    // get monthly clicks
    const monthlyClicks = await this.productClickService.getMonthlyClicks(products.map((product) => product.id));

    return monthlyClicks;
  }
}
