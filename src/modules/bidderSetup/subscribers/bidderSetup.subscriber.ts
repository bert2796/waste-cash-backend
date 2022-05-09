import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { Injectable } from '@nestjs/common';
import numeral from 'numeral';

import { NotificationService } from '../../notification/services/notification.services';
import { BidderSetup } from '../entities/bidderSetup.entity';

@EventSubscriber()
@Injectable()
export class BidderSetupSubscriber implements EntitySubscriberInterface<BidderSetup> {
  constructor(private readonly connection: Connection, private readonly notificationService: NotificationService) {
    connection.subscribers.push(this);
  }

  listenTo(): typeof BidderSetup {
    return BidderSetup;
  }

  async afterInsert(event: InsertEvent<BidderSetup>): Promise<void> {
    const {
      entity: { product },
    } = event;

    const formattedPrice = `\u20B1 ${numeral(product.offer.price).format('0,0.00')}`;

    await this.notificationService.createNotification({
      input: {
        event: 'create-bidder-setup',
        description: `Date, time and location has been added in your offer (${formattedPrice}) for ${product.name}`,
      },
      from: product.owner,
      to: product.bidder,
      product: product,
    });
  }

  async afterUpdate(event: UpdateEvent<BidderSetup>): Promise<void> {
    const {
      entity: { product },
    } = event;

    const formattedPrice = `\u20B1 ${numeral(product.offer.price).format('0,0.00')}`;

    await this.notificationService.createNotification({
      input: {
        event: 'update-bidder-setup',
        description: `Date, time and location has been updated in your offer (${formattedPrice}) for ${product.name}`,
      },
      from: product.owner,
      to: product.bidder,
      product: product,
    });
  }
}
