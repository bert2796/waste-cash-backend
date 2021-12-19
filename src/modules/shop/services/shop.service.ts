import { Injectable } from '@nestjs/common';

import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class ShopService {
  constructor(private readonly userService: UserService) {}

  async getShops(): Promise<User[]> {
    return await this.userService.getJunkShopUsers();
  }
}
