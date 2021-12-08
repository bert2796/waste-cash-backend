import { Injectable } from '@nestjs/common';

import { CreateNotificationInputDto } from '../dtos';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';
import { Notification } from '../entities/notification.entity';
import { NotificationRepository } from '../repositories/notification.repository';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async createNotification(params: {
    from?: User;
    to?: User;
    product?: Product;
    input: CreateNotificationInputDto;
  }): Promise<Notification> {
    const { from, to, product, input } = params;

    const notification = new Notification();
    notification.from = from || null;
    notification.to = to || null;
    notification.product = product || null;
    notification.event = input.event;
    notification.description = input.description;

    return await this.notificationRepository.save(notification);
  }
}
