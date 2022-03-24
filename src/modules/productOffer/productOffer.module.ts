import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationModule } from '../notification/notification.module';
import { ProductModule } from '../product/product.module';
import { ProductOfferRepository } from './repositories/productOffer.repository';
import { ProductOfferService } from './services/productOffer.service';
import { ProductOfferSubscriber } from './subscribers/productOffer.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOfferRepository]), NotificationModule, forwardRef(() => ProductModule)],
  controllers: [],
  providers: [ProductOfferService, ProductOfferSubscriber],
  exports: [ProductOfferService],
})
export class ProductOfferModule {}
