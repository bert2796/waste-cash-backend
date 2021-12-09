import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { SpaceService } from './services/space.service';

@Module({
  imports: [ConfigModule],
  providers: [SpaceService],
  exports: [SpaceService],
})
export class SpaceModule {}
