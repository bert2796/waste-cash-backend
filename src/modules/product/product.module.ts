import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressModule } from '../address/address.module';
import { BidderSetupModule } from '../bidderSetup/bidderSetup.module';
import { CategoryModule } from '../category/category.module';
import { SpaceModule } from '../space/space.module';
import { ProductOfferModule } from '../productOffer/productOffer.module';
import { ProductRepository } from './repositories/product.repository';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ReviewModule } from '../review/review.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository]),
    AddressModule,
    BidderSetupModule,
    CategoryModule,
    ReviewModule,
    SpaceModule,
    forwardRef(() => ProductOfferModule),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
