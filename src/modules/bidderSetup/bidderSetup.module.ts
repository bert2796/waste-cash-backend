import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BidderSetupRepository } from './repositories/bidderSetup.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BidderSetupRepository])],
})
export class BidderSetupModule {}
