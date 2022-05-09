import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateAddressInputDto } from '../dtos';
import { Address } from '../entities/address.entity';
import { AddressRepository } from '../repositories/address.repository';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async createAddress(params: CreateAddressInputDto): Promise<Address> {
    const { location, latitude, longitude } = params;

    const address = new Address();
    address.location = location || null;
    address.latitude = latitude || null;
    address.longitude = longitude || null;

    return await this.addressRepository.save(address);
  }

  async updateAddress(params: { addressId: number; input: Partial<Address> }): Promise<Address> {
    const { addressId, input } = params;
    const address = await this.addressRepository.findOne(addressId);
    if (!addressId) {
      throw new BadRequestException('Address does not exist.');
    }

    address.location = input.location || null;
    address.latitude = input.latitude || null;
    address.longitude = input.longitude || null;

    return await this.addressRepository.save(address, { reload: true });
  }
}
