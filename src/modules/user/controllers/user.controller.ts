import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';

import { Authorize } from '../../../common/decorators/authorize.decorator';
import { IUser } from '../interfaces';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async login(@Req() req: { user: User }): Promise<Omit<IUser, 'id' | 'password'>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = req.user;

    return rest;
  }
}
