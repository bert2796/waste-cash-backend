import { Injectable } from '@nestjs/common';

import { ProductService } from '../../product/services/product.service';
import { ProductClickService } from '../../productClick/services/productClick.service';
import { ProductOfferService } from '../../productOffer/services/productOffer.service';
import { getMonthName } from '../../../common/utils';

@Injectable()
export class ReportService {
  constructor(
    private readonly productService: ProductService,
    private readonly productClickService: ProductClickService,
    private readonly productOfferService: ProductOfferService
  ) {}

  async getMonthlySales(userId: number): Promise<{ [key: string]: { total: number } }> {
    // get products by userId
    const products = await this.productService.getProductsByUser(userId);

    // get monthly sales
    const monthlySales = await this.productOfferService.getMonthlySales(products.map((product) => product.id));
    let result: { [key: string]: { total: number } } = {};

    for (const monthlySale of monthlySales) {
      const month = getMonthName(monthlySale.month);
      const existingMonthlysale = result?.[`${month}`];
      if (existingMonthlysale) {
        existingMonthlysale.total = existingMonthlysale.total + monthlySale.price;
      } else {
        result[`${month}`] = {
          total: monthlySale.price,
        };
      }
    }

    if (Object.keys(result).length === 1) {
      const month = getMonthName(monthlySales[0].month - 1);

      result = {
        [`${month}`]: {
          total: 0,
        },
        ...result,
      };
    }

    return result;
  }

  async getMonthlyClicks(userId: number): Promise<{ [key: string]: { total: number } }> {
    // get products by userId
    const products = await this.productService.getProductsByUser(userId);

    // get monthly clicks
    const monthlyClicks = await this.productClickService.getMonthlyClicks(products.map((product) => product.id));
    let result: { [key: string]: { total: number } } = {};

    for (const monthlyClick of monthlyClicks) {
      const month = getMonthName(monthlyClick.month);
      const existingMonthlyClick = result?.[`${month}`];
      if (existingMonthlyClick) {
        existingMonthlyClick.total = existingMonthlyClick.total + monthlyClick.counter;
      } else {
        result[`${month}`] = {
          total: monthlyClick.counter,
        };
      }
    }

    if (Object.keys(result).length === 1) {
      const month = getMonthName(monthlyClicks[0].month - 1);

      result = {
        [`${month}`]: {
          total: 0,
        },
        ...result,
      };
    }

    return result;
  }
}
