import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from '../category/category.module';
import { SpaceModule } from '../space/space.module';
import { ProductOfferModule } from '../productOffer/productOffer.module';
import { ProductRepository } from './repositories/product.repository';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository]), CategoryModule, SpaceModule, ProductOfferModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
