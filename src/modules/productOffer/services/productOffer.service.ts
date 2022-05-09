import { BadRequestException, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import numeral from 'numeral';

import { ProductOfferStatus } from '../../../common/constant';
import { CreateProductOfferInputDto } from '../dtos';
import { NotificationService } from '../../notification/services/notification.services';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { ProductOffer } from '../entities/productOffer.entity';
import { ProductOfferRepository } from '../repositories/productOffer.repository';

@Injectable()
export class ProductOfferService {
  constructor(
    private readonly productOfferRepository: ProductOfferRepository,
    private readonly notificationService: NotificationService
  ) {}

  async createProductOffer(params: {
    input: CreateProductOfferInputDto;
    product: Product;
    user: User;
  }): Promise<ProductOffer> {
    const { input, product, user } = params;
    let productOffer = await this.productOfferRepository.findOne({
      user,
      product,
      status: In([ProductOfferStatus.PENDING, ProductOfferStatus.ACCEPTED]),
    });
    if (productOffer) {
      throw new BadRequestException('Offer is already existing.');
    }

    productOffer = new ProductOffer();
    productOffer.user = user;
    productOffer.product = product;
    productOffer.price = input.price;

    return await this.productOfferRepository.save(productOffer);
  }

  async updateProductOffer(
    productOfferId: number,
    input: Partial<ProductOffer>,
    isSold?: boolean
  ): Promise<ProductOffer> {
    const productOffer = await this.getProductOffer(productOfferId);
    productOffer.status = input.status;

    if (input?.status) {
      const status = input.status;
      const product = productOffer.product;
      const formattedPrice = `\u20B1 ${numeral(productOffer.price).format('0,0.00')}`;
      const description =
        status === ProductOfferStatus.ACCEPTED
          ? `Congratulations! Your offer (${formattedPrice}) for ${product.name} has been selected.
          Seller will send you another notification later for additional details.`
          : isSold
          ? `Sorry! Your offer (${formattedPrice}) for ${product.name} has been rejected and was sold to other bidder.`
          : `Sorry! Your offer (${formattedPrice}) for ${product.name} has been rejected.`;

      await this.notificationService.createNotification({
        input: {
          event: `${status}-product-offer`,
          description,
        },
        from: product.owner,
        to: productOffer.user,
        product: product,
      });
    }

    return await this.productOfferRepository.save(productOffer, { reload: true });
  }

  async updateProductOffers(producerOfferIds: number[], input: Partial<ProductOffer>): Promise<void> {
    await this.productOfferRepository.update({ id: In(producerOfferIds) }, input);
  }

  async getProductOffer(productOfferId: number): Promise<ProductOffer> {
    const productOffer = await this.productOfferRepository.findOne(productOfferId, {
      relations: ['user', 'product', 'product.owner'],
    });
    if (!productOffer) {
      throw new BadRequestException('Offer does not exist.');
    }

    return productOffer;
  }
}
