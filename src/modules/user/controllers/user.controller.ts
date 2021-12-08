import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';

import { Authorize } from '../../../common/decorators/authorize.decorator';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async login(@Req() req: { user: User }): Promise<User> {
    return req.user;
  }
}
