import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { NotificationService } from '../../notification/services/notification.services';
import { ProductOffer } from '../entities/productOffer.entity';

@EventSubscriber()
@Injectable()
export class ProductOfferSubscriber implements EntitySubscriberInterface<ProductOffer> {
  constructor(private readonly connection: Connection, private readonly notificationService: NotificationService) {
    connection.subscribers.push(this);
  }

  listenTo(): typeof ProductOffer {
    return ProductOffer;
  }

  async afterInsert(event: InsertEvent<ProductOffer>): Promise<void> {
    await this.notificationService.createNotification({
      input: {
        event: 'create-product-offer',
        description: `New offer for Product ${event.entity.product.name}`,
      },
      from: event.entity.user,
      to: event.entity.product.owner,
      product: event.entity.product,
    });
  }
}
