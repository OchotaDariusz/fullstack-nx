import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { Role } from '@fullstack/types';
import { jwtConstants, ROLES_KEY } from '@fullstack/constants';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private jwtStrategy: JwtStrategy
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler()
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    try {
      const token = request.headers.authorization?.split(' ')[1];
      if (!token) {
        return false;
      }

      const payload = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      const user = await this.jwtStrategy.validate(payload);

      return requiredRoles.some((role) => user.roles?.includes(role));
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
