import { Controller, Get, Patch, HttpCode, HttpStatus, Req, Param, Body, Query } from '@nestjs/common';

import { Authorize } from '../../../common/decorators/authorize.decorator';
import { User } from '../../user/entities/user.entity';
import { Notification } from '../entities/notification.entity';
import { NotificationService } from '../services/notification.services';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async getNotifications(@Req() req: { user: User }): Promise<Notification[]> {
    const { user } = req;

    return await this.notificationService.getNotifications(user);
  }

  @Patch('/:notificationId')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async updateNotification(
    @Param('notificationId') notificationId: string,
    @Body() input: Partial<Notification>
  ): Promise<Notification> {
    return await this.notificationService.updateNotification({ notificationId: +notificationId, input });
  }

  @Patch('/')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async updateNotifications(
    @Query() query: { notificationIds: string },
    @Body() input: Partial<Notification>
  ): Promise<Notification[]> {
    const notificationIds = query.notificationIds
      ? query.notificationIds.split(',').map((notificationId) => +notificationId)
      : [];

    return await this.notificationService.updateNotifications({ notificationIds, input });
  }
}
