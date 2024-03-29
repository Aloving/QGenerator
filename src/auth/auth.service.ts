import {
  ForbiddenException,
  GoneException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users';
import { UsersService } from '../users';
import { CryptService } from '../crypt/';

import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthService as IAuthService } from './interfaces/auth-service.interface';
import { LoginDto } from './dto/login.dto';
import { TokenRefreshDto } from './dto/token-refresh.dto';
import { TokensPair } from '../interfaces';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly cryptService: CryptService,
  ) {}

  async login({ login, password }: LoginDto) {
    const user = await this.userService.findUserByLogin({ login });

    if (
      !user ||
      !(await this.cryptService.comparePassword(password, user.password))
    ) {
      throw new UnauthorizedException();
    }

    const tokens = this.cryptService.createToken(user.id);

    await this.userService.addRefreshToken({
      userId: user.id,
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  async validateUser({ id }: JwtPayload): Promise<User> {
    return await this.userService.findUserById({ id });
  }

  async refreshToken({ refreshToken }: TokenRefreshDto): Promise<TokensPair> {
    const userByToken = await this.userService.findUserByRefreshToken({
      refreshToken,
    });

    if (!userByToken) {
      throw new GoneException();
    }

    const newTokenPair = this.cryptService.createToken(userByToken.id);

    await this.userService.addRefreshToken({
      userId: userByToken.id,
      refreshToken: newTokenPair.refreshToken,
    });

    return newTokenPair;
  }

  async getUserByToken(token: string): Promise<User | undefined> {
    const jwtPayload = this.cryptService.decodeToken<JwtPayload>(token);

    try {
      return await this.userService.findUserById({ id: jwtPayload.id });
    } catch (e) {
      throw new ForbiddenException();
    }
  }
}
