import { BadRequestException, ForbiddenException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ICredential } from '../interfaces';
import { LoginAuthInputDto, RegisterAuthInputDto } from '../dtos';
import { ConfigService } from '../../config/config.service';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { UserRoles } from 'src/common/constant';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(input: LoginAuthInputDto): Promise<ICredential> {
    const { username, password } = input;
    let user: User;

    try {
      user = await this.userService.validateUsernameAndPassword(username, password);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    const credential: ICredential = {
      accessToken: await this.jwtService.signAsync({ userId: user.id }),
      refreshToken: await this.jwtService.signAsync({ userId: user.id }),
    };

    return credential;
  }

  async register(input: RegisterAuthInputDto): Promise<ICredential> {
    let user: User;

    try {
      user = await this.userService.createUser(input);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    const credential: ICredential = {
      accessToken: await this.jwtService.signAsync({ userId: user.id }),
      refreshToken: await this.jwtService.signAsync({ userId: user.id }),
    };

    return credential;
  }

  async authorize(token: string, role?: UserRoles[]): Promise<User> {
    let payload: { exp: number; userId: number };

    try {
      payload = this.jwtService.decode(token) as {
        exp: number;
        userId: number;
      };

      if (!payload) {
        throw new Error('Invalid token.');
      }
    } catch (error) {
      this.logger.error(`authorize:error => Reason: ${error.message}`);

      throw new UnauthorizedException();
    }

    const user = await this.userService.getUser(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    } else if (role && !role.includes(user.role)) {
      throw new ForbiddenException();
    }

    return user;
  }
}
