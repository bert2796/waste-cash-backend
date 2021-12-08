import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationModule } from '../notification/notification.module';
import { ProductOfferRepository } from './repositories/productOffer.repository';
import { ProductOfferService } from './services/productOffer.service';
import { ProductOfferSubscriber } from './subscribers/productOffer.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOfferRepository]), NotificationModule],
  controllers: [],
  providers: [ProductOfferService, ProductOfferSubscriber],
  exports: [ProductOfferService],
})
export class ProductOfferModule {}
