import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizeGuard } from '../common/guards/authorize.guard';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { HealthModule } from './health/health.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.getTypeOrmConfig(),
    }),

    AuthModule,
    CategoryModule,
    ConfigModule,
    HealthModule,
    ProductModule,
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
