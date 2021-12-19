import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { User } from '../../user/entities/user.entity';
import { ShopService } from '../services/shop.service';

@Controller('shops')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getShops(): Promise<User[]> {
    return await this.shopService.getShops();
  }
}
