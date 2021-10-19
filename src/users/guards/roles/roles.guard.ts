import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExtractJwt } from 'passport-jwt';

import { Role } from '../../enums';
import { ROLES_KEY } from '../../decorators';
import { CryptService } from '../../../crypt';
import { JwtPayload } from '../../../auth/interfaces/jwt-payload.interface';
import { UsersService } from '../../users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private cryptService: CryptService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    if (token) {
      const { id } = this.cryptService.decodeToken<JwtPayload>(token);
      const user = await this.usersService.findUserById({ id });

      return requiredRoles.some((role) => user.role === role);
    }

    throw new UnauthorizedException();
  }
}
