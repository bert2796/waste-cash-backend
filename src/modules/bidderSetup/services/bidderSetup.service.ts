import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateBidderSetupInputDto } from '../dtos';
import { Product } from '../../product/entities/product.entity';
import { AddressService } from '../../address/services/address.service';
import { BidderSetup } from '../entities/bidderSetup.entity';
import { BidderSetupRepository } from '../repositories/bidderSetup.repository';

@Injectable()
export class BidderSetupService {
  constructor(
    private readonly addressService: AddressService,
    private readonly bidderSetupRepository: BidderSetupRepository
  ) {}

  async createBidderSetup(params: { input: CreateBidderSetupInputDto; product: Product }): Promise<BidderSetup> {
    const { input, product } = params;
    let bidderSetup = await this.bidderSetupRepository.findOne({ product });
    if (bidderSetup) {
      throw new BadRequestException('Bidder Setup is already existing.');
    }

    // create address
    const address = await this.addressService.createAddress({
      location: input.location,
      latitude: input.latitude,
      longitude: input.longitude,
    });

    bidderSetup = new BidderSetup();
    bidderSetup.date = input.date;
    bidderSetup.time = input.time;
    bidderSetup.address = address;
    bidderSetup.product = product;
    bidderSetup.mop = input.mop;

    return await this.bidderSetupRepository.save(bidderSetup);
  }

  async updateBidderSetup(bidderSetupId: number, input: Partial<BidderSetup>): Promise<BidderSetup> {
    const bidderSetup = await this.getBidderSetup(bidderSetupId);

    // if (input.location || input.latitude || input.longitude) {
    //   // update address
    //   await this.addressService.updateAddress({
    //     addressId: bidderSetup.address.id,
    //     input: {
    //       ...(input.location && { location: input.location }),
    //       ...(input.latitude && { latitude: input.latitude }),
    //       ...(input.longitude && { longitude: input.longitude }),
    //     },
    //   });
    // }

    bidderSetup.address = input.address || bidderSetup.address;
    bidderSetup.date = input.date || bidderSetup.date;
    bidderSetup.time = input.time || bidderSetup.time;
    bidderSetup.mop = input.mop || bidderSetup.mop;

    return await this.bidderSetupRepository.save(bidderSetup, { reload: true });
  }

  async getBidderSetup(bidderSetupId: number): Promise<BidderSetup> {
    const bidderSetup = await this.bidderSetupRepository.findOne(bidderSetupId, {
      relations: ['address', 'product', 'product.offer', 'product.owner', 'product.bidder'],
    });
    if (!bidderSetup) {
      throw new BadRequestException('Bidder setup does not exist.');
    }

    return bidderSetup;
  }
}
