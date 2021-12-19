import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { ShopController } from './controllers/shop.controller';
import { ShopService } from './services/shop.service';

@Module({
  imports: [UserModule],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
