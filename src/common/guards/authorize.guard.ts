import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { UserRoles } from '../constant';
import { User } from '../../modules/user/entities/user.entity';
import { AuthService } from '../../modules/auth/services/auth.service';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  private readonly logger = new Logger(AuthorizeGuard.name);

  constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log(`canActivate:start => ${new Date()}`);
    const authorize = this.reflector.get<{ roles?: UserRoles[] }>('authorize', context.getHandler());
    if (!authorize) {
      this.logger.log(`canActivate:end => ${new Date()}`);

      return true;
    }

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { headers } = request;
    if (!headers?.authorization || headers.authorization.split(' ')[0] !== 'Bearer') {
      throw new UnauthorizedException('Unauthorized.');
    }

    const token = headers.authorization.split(' ')[1];
    let user: User;

    try {
      user = await this.authService.authorize({ token, role: authorize?.roles || [] });
    } catch (error) {
      this.logger.error(`canActivate:error => ${error.message}`);

      if (error?.status) {
        if (error?.status === 403) {
          throw new ForbiddenException('Forbidden.');
        } else {
          throw new UnauthorizedException('Unauthorized.');
        }
      } else {
        throw new UnauthorizedException('Unauthorized.');
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (request as any).user = user;

    this.logger.log(`canActivate:end => ${new Date()}`);

    return true;
  }
}
