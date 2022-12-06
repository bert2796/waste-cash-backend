import { Module } from '@nestjs/common';

import { ProductModule } from '../product/product.module';
import { ProductClickModule } from '../productClick/productClick.module';
import { ProductOfferModule } from '../productOffer/productOffer.module';
import { ReportService } from './services/report.service';
import { ReportController } from './controllers/report.controller';

@Module({
  imports: [ProductModule, ProductClickModule, ProductOfferModule],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
