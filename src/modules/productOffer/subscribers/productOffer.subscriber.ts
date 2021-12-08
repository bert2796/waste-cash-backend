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
    const {
      entity: { user, product },
    } = event;

    await this.notificationService.createNotification({
      input: {
        event: 'create-product-offer',
        description: `New offer for ${product.name} from ${user.firstName} ${user.lastName}`,
      },
      from: user,
      to: product.owner,
      product: product,
    });
  }
}
