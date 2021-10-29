import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './modules/app.module';
import { ConfigService } from './modules/config/config.service';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('main');

  const PORT = (configService.get('PORT') as number) || 3000;

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, '0.0.0.0', () => logger.log(`app is now running in port ${PORT}`));
};

bootstrap();
