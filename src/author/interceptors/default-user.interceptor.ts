import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

import { User } from '../../users/entities';

import { IUsersService } from '../../users/interfaces';
import { ProviderEnum, ServiceEnum } from '../../enums';
import { IEnv } from '../../env/intefaces';

interface ExpectedBody {
  authorId?: User['id'];
}

export class DefaultUserInterceptor implements NestInterceptor {
  constructor(
    @Inject(ServiceEnum.USERS_SERVICE) private usersService: IUsersService,
    @Inject(ProviderEnum.Env) private env: IEnv,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const body: ExpectedBody = context.switchToHttp().getRequest().body;
    const $handleBody = () => fromPromise(this.handleBody(body));

    return $handleBody().pipe(
      switchMap((updatedBody) => {
        context.switchToHttp().getRequest().body = updatedBody;

        return next.handle().pipe();
      }),
    );
  }

  private handleBody = async (body: ExpectedBody) => {
    if (body.authorId) {
      return body;
    }

    const defaultUser = await this.getDefaultUser();

    if (!defaultUser) {
      throw new UnauthorizedException();
    }

    return {
      ...body,
      authorId: defaultUser.id,
    };
  };

  private getDefaultUser = () => {
    return this.usersService.findUserByLogin({
      login: this.env.DEFAULT_USER_LOGIN,
    });
  };
}
