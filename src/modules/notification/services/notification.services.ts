import { BadRequestException, Injectable } from '@nestjs/common';

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

  async getNotifications(user: User): Promise<Notification[]> {
    return await this.notificationRepository.find({ where: { to: user }, relations: ['from', 'to', 'product'] });
  }

  async updateNotification(params: { notificationId: number; input: Partial<Notification> }): Promise<Notification> {
    const { notificationId, input } = params;
    const notification = await this.notificationRepository.findOne(notificationId);
    if (!notification) {
      throw new BadRequestException('Notification does not exist.');
    }

    notification.isSeen = input.isSeen || false;

    return await this.notificationRepository.save(notification, { reload: true });
  }

  async updateNotifications(params: {
    notificationIds: number[];
    input: Partial<Notification>;
  }): Promise<Notification[]> {
    const { notificationIds, input } = params;

    if (notificationIds.length) {
      return await Promise.all(
        notificationIds.map(async (notificationId) => {
          const notification = await this.notificationRepository.findOne(notificationId);
          if (!notification) {
            throw new BadRequestException('Notification does not exist.');
          }

          notification.isSeen = input.isSeen || false;

          return await this.notificationRepository.save(notification, { reload: true });
        })
      );
    }

    return [];
  }
}
