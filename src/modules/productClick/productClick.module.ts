import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductModule } from '../product/product.module';
import { ProductClickRepository } from './repositories/productClick.repository';
import { ProductClickService } from './services/productClick.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductClickRepository]), forwardRef(() => ProductModule)],
  controllers: [],
  providers: [ProductClickService],
  exports: [ProductClickService],
})
export class ProductClickModule {}
