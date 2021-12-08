import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationRepository } from './repositories/notification.repository';
import { NotificationService } from './services/notification.services';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationRepository])],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
