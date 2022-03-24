import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizeGuard } from '../common/guards/authorize.guard';
import { AuthModule } from './auth/auth.module';
import { BidderSetupModule } from './bidderSetup/bidderSetup.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { EventModule } from './event/event.module';
import { HealthModule } from './health/health.module';
import { MessageModule } from './message/message.module';
import { NotificationModule } from './notification/notification.module';
import { ProductModule } from './product/product.module';
import { ProductOfferModule } from './productOffer/productOffer.module';
import { ShopModule } from './shop/shop.module';
import { SpaceModule } from './space/space.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.getTypeOrmConfig(),
    }),

    AuthModule,
    BidderSetupModule,
    CategoryModule,
    ConfigModule,
    EventModule,
    HealthModule,
    MessageModule,
    NotificationModule,
    ProductModule,
    ProductOfferModule,
    ShopModule,
    SpaceModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizeGuard,
    },
  ],
})
export class AppModule {}
