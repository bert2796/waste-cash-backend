import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { Injectable } from '@nestjs/common';
import numeral from 'numeral';

import { ProductStatus, ProductOfferStatus } from '../../../common/constant';
import { NotificationService } from '../../notification/services/notification.services';
import { ProductService } from '../../product/services/product.service';
import { ProductOffer } from '../entities/productOffer.entity';

@EventSubscriber()
@Injectable()
export class ProductOfferSubscriber implements EntitySubscriberInterface<ProductOffer> {
  constructor(
    private readonly connection: Connection,
    private readonly notificationService: NotificationService,
    private readonly productService: ProductService
  ) {
    connection.subscribers.push(this);
  }

  listenTo(): typeof ProductOffer {
    return ProductOffer;
  }

  async afterInsert(event: InsertEvent<ProductOffer>): Promise<void> {
    const {
      entity: { user, price, product },
    } = event;

    const formattedPrice = `\u20B1 ${numeral(price).format('0,0.00')}`;

    await this.notificationService.createNotification({
      input: {
        event: 'create-product-offer',
        description: `New offer (${formattedPrice}) for ${product.name} from ${user.firstName} ${user.lastName}`,
      },
      from: user,
      to: product.owner,
      product: product,
    });
  }

  async afterUpdate(event: UpdateEvent<ProductOffer>): Promise<void> {
    const {
      entity: { user, product, price, status },
    } = event;

    // update product
    if (status === ProductOfferStatus.ACCEPTED) {
      await this.productService.updateProduct({
        productId: product.id,
        input: { status: ProductStatus.SOLD, bidder: user },
      });
    }

    const formattedPrice = `\u20B1 ${numeral(price).format('0,0.00')}`;
    const description =
      status === ProductOfferStatus.ACCEPTED
        ? `Congratulations! Your offer (${formattedPrice}) for ${product.name} has been selected.
          Seller will send you another notification later for additional details.`
        : `Sorry! Your offer (${formattedPrice}) for ${product.name} has been rejected`;

    await this.notificationService.createNotification({
      input: {
        event: `${status}-product-offer`,
        description,
      },
      from: product.owner,
      to: user,
      product: product,
    });
  }
}
