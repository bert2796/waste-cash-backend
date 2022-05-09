import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressModule } from '../address/address.module';
import { BidderSetupRepository } from './repositories/bidderSetup.repository';
import { BidderSetupService } from './services/bidderSetup.service';
import { BidderSetupSubscriber } from './subscribers/bidderSetup.subscriber';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([BidderSetupRepository]), AddressModule, NotificationModule],
  providers: [BidderSetupService, BidderSetupSubscriber],
  exports: [BidderSetupService],
})
export class BidderSetupModule {}
