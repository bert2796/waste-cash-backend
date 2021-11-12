import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateProductOfferInputDto } from '../dtos';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { ProductOffer } from '../entities/productOffer.entity';
import { ProductOfferRepository } from '../repositories/productOffer.repository';

@Injectable()
export class ProductOfferService {
  constructor(private readonly productOfferRepository: ProductOfferRepository) {}

  async createProductOffer(user: User, product: Product, input: CreateProductOfferInputDto): Promise<ProductOffer> {
    let productOffer = await this.productOfferRepository.findOne({ user, product });
    if (productOffer) {
      throw new BadRequestException('Offer is already existing.');
    }

    productOffer = new ProductOffer();
    productOffer.user = user;
    productOffer.product = product;
    productOffer.price = input.price;

    return await this.productOfferRepository.save(productOffer);
  }
}
