import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';

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
}
