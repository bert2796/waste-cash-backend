import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('health')
export class HealthController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async healthCheck(): Promise<{ message: string }> {
    return { message: 'System is very healthy ❤️' };
  }
}
