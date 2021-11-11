import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductOfferRepository } from './repositories/productOffer.repository';
import { ProductOfferService } from './services/productOffer.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOfferRepository])],
  controllers: [],
  providers: [ProductOfferService],
  exports: [ProductOfferService],
})
export class ProductOfferModule {}
