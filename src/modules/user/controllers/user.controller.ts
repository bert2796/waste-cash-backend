import { Controller, Get, HttpCode, HttpStatus, Req, Patch, Body } from '@nestjs/common';

import { Authorize } from '../../../common/decorators/authorize.decorator';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async login(@Req() req: { user: User }): Promise<User> {
    return req.user;
  }

  @Patch('/me')
  @HttpCode(HttpStatus.OK)
  @Authorize()
  async updateUser(@Req() req: { user: User }, @Body() input: Partial<User>): Promise<User> {
    const { user } = req;

    return await this.userService.updateUser({ user, input });
  }
}
