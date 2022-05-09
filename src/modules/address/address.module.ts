import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressRepository } from './repositories/address.repository';
import { AddressService } from './services/address.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressRepository])],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
