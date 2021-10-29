import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';

import { ICredential } from '../interfaces';
import { LoginAuthInputDto, RegisterAuthInputDto } from '../dtos';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() input: LoginAuthInputDto): Promise<ICredential> {
    return await this.authService.login(input);
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() input: RegisterAuthInputDto): Promise<ICredential> {
    return await this.authService.register(input);
  }
}
